/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { IAlimento } from "../../../types/models";
import {
  createAlimento,
  updateAlimento,
} from "../../../services/alimento-service";

interface AlimentoFormProps {
  alimentoToEdit?: IAlimento | null;
  onSuccess: () => void;
}

export default function AlimentoForm({
  alimentoToEdit,
  onSuccess,
}: AlimentoFormProps) {
  const [name, setName] = useState("");
  const [custo, setCusto] = useState(0);
  const [peso, setPeso] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect para popular o formulário quando um alimento é passado para edição
  useEffect(() => {
    if (alimentoToEdit) {
      setName(alimentoToEdit.name);
      setCusto(alimentoToEdit.custo);
      setPeso(alimentoToEdit.peso);
    } else {
      // Limpa o formulário se estiver no modo de criação
      setName("");
      setCusto(0);
      setPeso(0);
    }
  }, [alimentoToEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const alimentoData = {
      name,
      custo: parseFloat(`${custo}`),
      peso: parseFloat(`${peso}`),
    };

    try {
      if (alimentoToEdit) {
        await updateAlimento(alimentoToEdit.id, alimentoData);
      } else {
        await createAlimento(alimentoData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Custo (R$)
        </label>
        <input
          type="number"
          step="0.01"
          value={custo}
          onChange={(e) => setCusto(parseFloat(e.target.value))}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Peso (kg)
        </label>
        <input
          type="number"
          step="0.01"
          value={peso}
          onChange={(e) => setPeso(parseFloat(e.target.value))}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting
          ? "Salvando..."
          : alimentoToEdit
          ? "Salvar Alterações"
          : "Criar Alimento"}
      </button>
    </form>
  );
}
