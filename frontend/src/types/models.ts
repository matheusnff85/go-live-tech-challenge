// Representa o objeto Alimento como ele vem do banco de dados
export type IAlimento = {
  id: number;
  name: string;
  custo: number;
  peso: number;
  deletedAt: Date | null;
  created_by_id: number;
};

// Representa os dados necessários para CRIAR um novo Alimento
export type CreateAlimentoDto = {
  name: string;
  custo: number;
  peso: number;
};

// Representa o objeto Prato como ele vem do banco de dados
export type IPrato = {
  id: number;
  name: string;
  preco: number;
  custo: number;
  data_lancamento: Date;
  deletedAt: Date | null;
  created_by_id: number;
  alimentos: IAlimento[];
};

// Representa os dados necessários para CRIAR um novo Prato
export type CreatePratoDto = {
  name: string;
  preco: number;
  custo: number;
  data_lancamento: Date | string;
  alimentoIds: number[];
};
