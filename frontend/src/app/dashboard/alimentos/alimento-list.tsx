/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import AlimentoForm from "./alimento-form";
import { IAlimento } from "../../../types/models";
import {
  deleteAlimento,
  getAlimentos,
} from "../../../services/alimento-service";
import { useAuth } from "../../../services/auth";

export default function AlimentosList() {
  const [alimentos, setAlimentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alimentoToEdit, setAlimentoToEdit] = useState<IAlimento | null>(null);

  const { user } = useAuth();

  const fetchAlimentos = async () => {
    try {
      setIsLoading(true);
      const data = await getAlimentos();
      setAlimentos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlimentos();
  }, []);

  const handleCreate = () => {
    setAlimentoToEdit(null); // Garante que o formulário estará em modo de criação
    setIsModalOpen(true);
  };

  const handleEdit = (alimento: IAlimento) => {
    setAlimentoToEdit(alimento); // Passa o alimento para o formulário
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este alimento?")) {
      try {
        await deleteAlimento(id);
        fetchAlimentos(); // Recarrega a lista após a exclusão
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchAlimentos();
  };

  if (isLoading) return <p>Carregando alimentos...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        {user && user.role !== "leitor" && (
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Criar Novo Alimento
          </button>
        )}
      </div>

      {/* Tabela para exibir os alimentos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Custo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peso
              </th>
              {user && user.role !== "leitor" && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alimentos.length > 0 ? (
              alimentos.map((alimento: IAlimento) => (
                <tr key={alimento.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {alimento.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {alimento.custo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alimento.peso} kg
                  </td>
                  {user && user.role !== "leitor" && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(alimento)}
                        className="text-white bg-indigo-500 hover:bg-indigo-700 rounded-md px-2 py-1 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(alimento.id)}
                        className="text-white bg-red-500 hover:bg-red-700 rounded-md px-2 py-1 cursor-pointer"
                      >
                        Excluir
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Nenhum alimento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* O Modal que contém o formulário */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={alimentoToEdit ? "Editar Alimento" : "Criar Novo Alimento"}
      >
        <AlimentoForm
          alimentoToEdit={alimentoToEdit}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}
