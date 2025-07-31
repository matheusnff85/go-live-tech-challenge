import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth-service";
import StatusCodes from "../types/status-codes";

class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
    this.login = this.login.bind(this);
  }
  // Rota de login
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
