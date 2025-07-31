import { Request, Response, NextFunction } from "express";
import PratoService from "../services/prato-service";
import StatusCodes from "../types/status-codes";

class PratoController {
  private pratoService: PratoService;

  constructor() {
    this.pratoService = new PratoService();
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user.role !== "administrador") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Você não possui permissão para criar pratos.",
        });
      }
      const newPrato = await this.pratoService.create(req.body, req.user.id);
      return res.status(StatusCodes.CREATED).json(newPrato);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pratos = await this.pratoService.findAll();
      return res.status(StatusCodes.OK).json(pratos);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const prato = await this.pratoService.findById(Number(id));
      return res.status(StatusCodes.OK).json(prato);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user.role !== "administrador") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Você não possui permissão para atualizar pratos.",
        });
      }
      const { id } = req.params;
      const updatedPrato = await this.pratoService.update(Number(id), req.body);
      return res.status(StatusCodes.OK).json(updatedPrato);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user.role !== "administrador") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Você não possui permissão para deletar pratos.",
        });
      }
      const { id } = req.params;
      await this.pratoService.softDelete(Number(id));
      return res.status(StatusCodes.SUCCESS_NO_RESPONSE).send();
    } catch (error) {
      next(error);
    }
  }
}

export default PratoController;
