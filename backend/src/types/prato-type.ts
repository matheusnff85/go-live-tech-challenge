// DTO para a criação de um prato.
interface CreatePratoDto {
  name: string;
  preco: number;
  custo: number;
  data_lancamento: string | Date;
  alimentoIds: number[];
}

// DTO para a atualização de um prato.
interface UpdatePratoDto {
  name?: string;
  preco?: number;
  custo?: number;
  data_lancamento?: string | Date;
  alimentoIds?: number[];
}
