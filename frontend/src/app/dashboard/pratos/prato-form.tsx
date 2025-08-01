/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, FormEvent } from "react";
import Select from "react-select";
import { createPrato, updatePrato } from "../../../services/prato-service";
import { getAlimentos } from "../../../services/alimento-service";

interface PratoFormProps {
  pratoToEdit?: any | null;
  onSuccess: () => void;
}

// Opção de tipo para o react-select
type SelectOption = { value: number; label: string };

export default function PratoForm({ pratoToEdit, onSuccess }: PratoFormProps) {
  // Estados do formulário
  const [formData, setFormData] = useState({
    name: "",
    preco: "",
    custo: "",
    data_lancamento: "",
  });
  const [alimentosSelecionados, setAlimentosSelecionados] = useState<
    SelectOption[]
  >([]);
  const [alimentosDisponiveis, setAlimentosDisponiveis] = useState<
    SelectOption[]
  >([]);

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Busca todos os alimentos para popular o seletor
  useEffect(() => {
    async function fetchAlimentos() {
      try {
        const data = await getAlimentos();
        const options = data.map((alimento: any) => ({
          value: alimento.id,
          label: alimento.name,
        }));
        setAlimentosDisponiveis(options);
      } catch (error: any) {
        setError(error.message || "Não foi possível carregar os alimentos.");
      }
    }
    fetchAlimentos();
  }, []);

  // Popula o formulário se estiver em modo de edição
  useEffect(() => {
    if (pratoToEdit) {
      setFormData({
        name: pratoToEdit.name,
        preco: String(pratoToEdit.preco),
        custo: String(pratoToEdit.custo),
        data_lancamento: new Date(pratoToEdit.data_lancamento)
          .toISOString()
          .split("T")[0], // Formato YYYY-MM-DD
      });
      const selected = pratoToEdit.alimentos.map((alimento: any) => ({
        value: alimento.id,
        label: alimento.name,
      }));
      setAlimentosSelecionados(selected);
    }
  }, [pratoToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const pratoData = {
      ...formData,
      preco: parseFloat(formData.preco),
      custo: parseFloat(formData.custo),
      alimentoIds: alimentosSelecionados.map((option) => option.value),
    };

    try {
      if (pratoToEdit) {
        await updatePrato(pratoToEdit.id, pratoData);
      } else {
        await createPrato(pratoData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome do Prato
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preço de Venda (R$)
          </label>
          <input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Custo (R$)
          </label>
          <input
            type="number"
            name="custo"
            value={formData.custo}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data de Lançamento
        </label>
        <input
          type="date"
          name="data_lancamento"
          value={formData.data_lancamento}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Alimentos
        </label>
        <Select
          isMulti
          options={alimentosDisponiveis}
          value={alimentosSelecionados}
          onChange={(options) =>
            setAlimentosSelecionados(options as SelectOption[])
          }
          className="mt-1"
          placeholder="Selecione..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400 cursor-pointer hover:bg-blue-700 transition-colors"
      >
        {isSubmitting
          ? "Salvando..."
          : pratoToEdit
          ? "Salvar Alterações"
          : "Criar Prato"}
      </button>
    </form>
  );
}
