import { Transaction } from "../contexts/TransactionsContext";

export const calculateSummary = (transactions: Transaction[]) => {
  const { entradas, saidas, total } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.entradas += transaction.price;
      } else if (transaction.type === "outcome") {
        acc.saidas += transaction.price;
      }
      acc.total = acc.entradas - acc.saidas;
      return acc;
    },
    {
      entradas: 0,
      saidas: 0,
      total: 0,
    }
  );

  // Formatar valores em Real (BRL)
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return {
    entradas: formatCurrency(entradas),
    saidas: formatCurrency(saidas),
    total: formatCurrency(total),
  };
};
