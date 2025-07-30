import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../types/custom-error";
import StatusCodes from "../types/status-codes";

const authConfig = {
  secret: process.env.JWT_SECRET || "golivetech",
  expiresIn: "1d",
};

// Estendendo a interface Request do Express para adicionar a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        role: string;
      };
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Token não fornecido.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, authConfig.secret) as {
      id: number;
      role: string;
    };

    // Anexa o id e o perfil do usuário na requisição
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Token inválido.");
  }
};
