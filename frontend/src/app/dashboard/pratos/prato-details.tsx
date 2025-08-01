"use client";

import { IPrato } from "../../../types/models";

interface PratoDetailsProps {
  prato: IPrato;
}

// Helper para formatar moeda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Helper para formatar data
const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function PratoDetails({ prato }: PratoDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="font-semibold text-gray-500">Preço de Venda</h3>
          <p className="text-gray-900 text-lg">{formatCurrency(prato.preco)}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-500">Custo de Produção</h3>
          <p className="text-gray-900 text-lg">{formatCurrency(prato.custo)}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500">Data de Lançamento</h3>
        <p className="text-gray-900">{formatDate(prato.data_lancamento)}</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 mb-2">Alimentos Inclusos</h3>
        {prato.alimentos && prato.alimentos.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {prato.alimentos.map((alimento) => (
              <span
                key={alimento.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                {alimento.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhum alimento associado.</p>
        )}
      </div>
    </div>
  );
}
