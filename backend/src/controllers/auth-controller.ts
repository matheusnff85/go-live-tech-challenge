import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth-service";
import StatusCodes from "../types/status-codes";

class AuthController {
  // Rota de login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const authService = new AuthService();
      const user = await authService.login(email, password);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
