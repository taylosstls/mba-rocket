// Formatar valores em Real (BRL)
export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatDate = (date: string) => {
  const day = new Intl.DateTimeFormat('pt-BR');
  return day.format(new Date(date));
}