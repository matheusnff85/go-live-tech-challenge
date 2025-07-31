/* eslint-disable @typescript-eslint/no-explicit-any */
import $ from "jquery";
import type { CreateAlimentoDto } from "../types/models";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => localStorage.getItem("token");

/**
 * Busca a lista de todos os alimentos.
 */
export const getAlimentos = async () => {
  try {
    console.log(getToken());
    const response = await $.ajax({
      url: `${API_URL}/alimento`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response;
  } catch (error: any) {
    const errorMessage =
      error.responseJSON?.message || "Erro ao buscar alimentos.";
    throw new Error(errorMessage);
  }
};

/**
 * Cria um novo alimento.
 * @param data Os dados do novo alimento.
 */
export const createAlimento = async (data: CreateAlimentoDto) => {
  try {
    const response = await $.ajax({
      url: `${API_URL}/alimento`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    const errorMessage =
      error.responseJSON?.message || "Erro ao criar o alimento.";
    throw new Error(errorMessage);
  }
};

/**
 * Atualiza um alimento existente.
 * @param id O ID do alimento a ser atualizado.
 * @param data Os novos dados do alimento.
 */
export const updateAlimento = async (id: number, data: CreateAlimentoDto) => {
  try {
    const response = await $.ajax({
      url: `${API_URL}/alimento/${id}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    const errorMessage =
      error.responseJSON?.message || "Erro ao atualizar o alimento.";
    throw new Error(errorMessage);
  }
};

/**
 * Deleta (logicamente) um alimento.
 * @param id O ID do alimento a ser deletado.
 */
export const deleteAlimento = async (id: number) => {
  try {
    const response = await $.ajax({
      url: `${API_URL}/alimento/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response;
  } catch (error: any) {
    const errorMessage =
      error.responseJSON?.message || "Erro ao deletar o alimento.";
    throw new Error(errorMessage);
  }
};
