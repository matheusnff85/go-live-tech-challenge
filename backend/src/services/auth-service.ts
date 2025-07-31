import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import CustomError from "../types/custom-error";
import StatusCodes from "../types/status-codes";

class AuthService {
  private JWT_SECRET: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new CustomError(
        StatusCodes.SERVER_ERROR,
        "Erro: JWT_SECRET não foi definida."
      );
    }
    this.JWT_SECRET = process.env.JWT_SECRET;
  }
  public async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Credenciais inválidas.");
    }

    // Comparação de senhas
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Credenciais inválidas.");
    }

    const { id, name, role } = user;

    // Geração de token
    const token = jwt.sign(
      { id, name, role },
      this.JWT_SECRET || "golivetech",
      {
        expiresIn: "1d",
      }
    );

    return {
      user: {
        id,
        name,
        email,
        role,
      },
      token,
    };
  }
}

export default AuthService;
