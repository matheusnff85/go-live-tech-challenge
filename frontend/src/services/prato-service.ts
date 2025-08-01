/* eslint-disable @typescript-eslint/no-explicit-any */
import $ from "jquery";
import type { CreatePratoDto } from "../types/models";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => localStorage.getItem("token");

/**
 * Busca a lista de todos os pratos, incluindo os alimentos associados.
 */
export const getPratos = async () => {
  try {
    const response = await $.ajax({
      url: `${API_URL}/prato`,
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response;
  } catch (error: any) {
    const errorMessage = error.message || "Erro ao buscar pratos.";
    throw new Error(errorMessage);
  }
};

/**
 * Cria um novo prato.
 * @param data Os dados do novo prato, incluindo o array de IDs de alimentos.
 */
export const createPrato = async (data: CreatePratoDto) => {
  try {
    const response = await $.ajax({
      url: `${API_URL}/prato`,
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      contentType: "application/json",
      data: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    const errorMessage = error.message || "Erro ao criar o prato.";
    throw new Error(errorMessage);
  }
};

/**
 * Atualiza um prato existente.
 * @param id O ID do prato a ser atualizado.
 * @param data Os novos dados do prato.
 */
export const updatePrato = async (id: number, data: CreatePratoDto) => {
  try {
    const response = await $.ajax({
      url: `${API_URL}/prato/${id}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${getToken()}` },
      contentType: "application/json",
      data: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    const errorMessage = error.message || "Erro ao atualizar o prato.";
    throw new Error(errorMessage);
  }
};

/**
 * Deleta (logicamente) um prato.
 * @param id O ID do prato a ser deletado.
 */
export const deletePrato = async (id: number) => {
  try {
    const response = await $.ajax({
      url: `${API_URL}/prato/${id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response;
  } catch (error: any) {
    const errorMessage = error.message || "Erro ao deletar o prato.";
    throw new Error(errorMessage);
  }
};
