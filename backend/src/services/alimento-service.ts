import { prisma } from "../lib/prisma";
import CustomError from "../types/custom-error";
import StatusCodes from "../types/status-codes";

class AlimentoService {
  // Método para criar um novo alimento
  public async create(data: any, creatorId: number) {
    try {
      const newAlimento = await prisma.alimento.create({
        data: {
          ...data,
          createdBy: {
            connect: {
              id: creatorId,
            },
          },
        },
      });
      return newAlimento;
    } catch (error: any) {
      throw new CustomError(StatusCodes.BAD_REQUEST, error.message);
    }
  }

  // Método para buscar todos os alimentos
  public async getAll() {
    try {
      const alimentos = await prisma.alimento.findMany({
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: {
          deletedAt: null, // Exclui alimentos que foram deletados
        },
      });
      return alimentos;
    } catch (error: any) {
      throw new CustomError(StatusCodes.SERVER_ERROR, error.message);
    }
  }

  // Método para buscar um alimento específico por ID
  public async getById(id: number) {
    try {
      const alimento = await prisma.alimento.findUnique({
        where: { id, deletedAt: null }, // Verifica se o alimento não foi deletado
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (!alimento) {
        throw new CustomError(
          StatusCodes.NOT_FOUND,
          "Alimento não encontrado."
        );
      }
      return alimento;
    } catch (error: any) {
      throw new CustomError(StatusCodes.SERVER_ERROR, error.message);
    }
  }

  // Método para atualizar um alimento
  public async update(id: number, data: any) {
    try {
      const updatedAlimento = await prisma.alimento.update({
        where: { id },
        data,
      });
      return updatedAlimento;
    } catch (error: any) {
      throw new CustomError(StatusCodes.BAD_REQUEST, error.message);
    }
  }

  // Método para deletar um alimento por soft delete
  public async delete(id: number) {
    try {
      const deletedAlimento = await prisma.alimento.update({
        where: { id },
        data: { deletedAt: new Date() }, // Marca o alimento como deletado
      });
      return deletedAlimento;
    } catch (error: any) {
      throw new CustomError(StatusCodes.BAD_REQUEST, error.message);
    }
  }
}

export default AlimentoService;
