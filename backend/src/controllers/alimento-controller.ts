import { Request, Response, NextFunction } from "express";
import AlimentoService from "../services/alimento-service";
import StatusCodes from "../types/status-codes";

class AlimentoController {
  private alimentoService: AlimentoService;
  constructor() {
    // Inicializa o serviço de autenticação
    this.alimentoService = new AlimentoService();
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  // Rota de criação de alimento
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user.role !== "administrador") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Você não possui permissão para criar alimentos.",
        });
      }
      const newAlimento = await this.alimentoService.create(
        req.body,
        req.user.id
      );
      return res.status(StatusCodes.CREATED).json(newAlimento);
    } catch (error) {
      next(error);
    }
  }

  // Rota para buscar todos os alimentos
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const alimentos = await this.alimentoService.getAll();
      return res.status(StatusCodes.OK).json(alimentos);
    } catch (error) {
      next(error);
    }
  }

  //Rota para buscar um alimento específico
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const alimento = await this.alimentoService.getById(Number(id));
      if (!alimento) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Alimento não encontrado.",
        });
      }
      return res.status(StatusCodes.OK).json(alimento);
    } catch (error) {
      next(error);
    }
  }

  //Rota para atualizar um alimento
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (req.user.role !== "administrador") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Você não possui permissão para atualizar alimentos.",
        });
      }
      const updatedAlimento = await this.alimentoService.update(
        Number(id),
        req.body
      );
      return res.status(StatusCodes.OK).json(updatedAlimento);
    } catch (error) {
      next(error);
    }
  }

  //Rota para deletar um alimento
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (req.user.role !== "administrador") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Você não possui permissão para deletar alimentos.",
        });
      }
      await this.alimentoService.delete(Number(id));
      return res.status(StatusCodes.SUCCESS_NO_RESPONSE).send();
    } catch (error) {
      next(error);
    }
  }
}

export default AlimentoController;
