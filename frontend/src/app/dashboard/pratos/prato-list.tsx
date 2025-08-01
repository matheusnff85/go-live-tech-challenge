/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import PratoForm from "./prato-form";
import { getPratos, deletePrato } from "../../../services/prato-service";
import { IAlimento, IPrato } from "../../../types/models";
import PratoDetails from "./prato-details";
import { useAuth } from "../../../services/auth";

export default function PratosList() {
  const [pratos, setPratos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pratoToEdit, setPratoToEdit] = useState<any | null>(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [pratoToView, setPratoToView] = useState<IPrato | null>(null);

  const { user } = useAuth();

  const fetchPratos = async () => {
    setIsLoading(true);
    try {
      const data = await getPratos();
      setPratos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPratos();
  }, []);

  const handleCreate = () => {
    setPratoToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (prato: IPrato) => {
    setPratoToEdit(prato);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este prato?")) {
      await deletePrato(id);
      fetchPratos();
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchPratos();
  };

  const handleViewDetails = (prato: IPrato) => {
    setPratoToView(prato);
    setIsViewModalOpen(true);
  };

  if (isLoading) return <p>Carregando pratos...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        {user && user.role !== "leitor" && (
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Criar Novo Prato
          </button>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Alimentos
              </th>
              {user && user.role !== "leitor" && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pratos.map((prato: IPrato) => (
              <tr
                key={prato.id}
                onClick={() => handleViewDetails(prato)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {prato.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  R$ {prato.preco}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {prato.alimentos &&
                      prato.alimentos.map((alimento: IAlimento) => (
                        <span
                          key={alimento.id}
                          className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded-full"
                        >
                          {alimento.name}
                        </span>
                      ))}
                  </div>
                </td>
                {user && user.role !== "leitor" && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(prato);
                      }}
                      className="text-white bg-indigo-500 hover:bg-indigo-700 rounded-md px-2 py-1 cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(prato.id);
                      }}
                      className="text-white bg-red-500 hover:bg-red-700 rounded-md px-2 py-1 cursor-pointer"
                    >
                      Excluir
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={pratoToEdit ? "Editar Prato" : "Criar Novo Prato"}
      >
        <PratoForm pratoToEdit={pratoToEdit} onSuccess={handleSuccess} />
      </Modal>

      {pratoToView && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={pratoToView.name}
        >
          <PratoDetails prato={pratoToView} />
        </Modal>
      )}
    </div>
  );
}
