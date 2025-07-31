import { prisma } from "../lib/prisma";
import CustomError from "../types/custom-error";
import StatusCodes from "../types/status-codes";

class PratoService {
  /**
   * Valida se todos os IDs de alimentos fornecidos existem no banco.
   * @param alimentoIds Array de IDs de alimentos a serem validados.
   */
  private async validateAlimentos(alimentoIds: number[]): Promise<void> {
    if (alimentoIds && alimentoIds.length > 0) {
      const existingAlimentos = await prisma.alimento.findMany({
        where: {
          id: { in: alimentoIds },
          deletedAt: null,
        },
      });

      if (existingAlimentos.length !== alimentoIds.length) {
        throw new CustomError(
          StatusCodes.BAD_REQUEST,
          "Um ou mais alimentos fornecidos são inválidos ou não existem."
        );
      }
    }
  }

  /**
   * Cria um novo prato e o associa aos alimentos fornecidos.
   * @param data Os dados do prato a ser criado.
   * @param creatorId O ID do usuário que está criando o prato.
   */
  public async create(data: CreatePratoDto, creatorId: number) {
    await this.validateAlimentos(data.alimentoIds);

    return prisma.prato.create({
      data: {
        name: data.name,
        preco: data.preco,
        custo: data.custo,
        data_lancamento: new Date(data.data_lancamento),
        createdBy: {
          connect: { id: creatorId },
        },
        // Conecta o prato aos alimentos usando o array de IDs
        alimentos: {
          connect: data.alimentoIds.map((id) => ({ id })),
        },
      },
    });
  }

  /**
   * Retorna uma lista de todos os pratos, incluindo seus alimentos associados.
   */
  public async findAll() {
    return prisma.prato.findMany({
      where: { deletedAt: null },
      include: {
        // Inclui os dados dos alimentos associados em cada prato
        alimentos: {
          where: { deletedAt: null }, // Garante que alimentos deletados não apareçam
        },
      },
      orderBy: { name: "asc" },
    });
  }

  /**
   * Encontra um único prato pelo seu ID.
   * @param id O ID do prato.
   */
  public async findById(id: number) {
    const prato = await prisma.prato.findFirst({
      where: { id, deletedAt: null },
      include: { alimentos: true },
    });

    if (!prato) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Prato não encontrado.");
    }
    return prato;
  }

  /**
   * Atualiza os dados de um prato existente.
   * @param id O ID do prato a ser atualizado.
   * @param data Os novos dados do prato.
   */
  public async update(id: number, data: UpdatePratoDto) {
    await this.findById(id); // Garante que o prato existe

    if (data.alimentoIds) {
      await this.validateAlimentos(data.alimentoIds);
    }

    return prisma.prato.update({
      where: { id },
      data: {
        name: data.name,
        preco: data.preco,
        custo: data.custo,
        data_lancamento: data.data_lancamento
          ? new Date(data.data_lancamento)
          : undefined,
        // 'set' substitui completamente as relações existentes pelas novas
        alimentos: data.alimentoIds
          ? {
              set: data.alimentoIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  /**
   * Realiza a exclusão lógica de um prato.
   * @param id O ID do prato a ser deletado.
   */
  public async softDelete(id: number) {
    await this.findById(id);

    return prisma.prato.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export default PratoService;
