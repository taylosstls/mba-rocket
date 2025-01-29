import { useMemo } from "react";

import { formatCurrency } from "../utils/formatter";

import { Transaction } from "../contexts/TransactionsContext";

export function useSummary(transactions: Transaction[]) {
  const { income, outcome, total } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.price;
        } else if (transaction.type === "outcome") {
          acc.outcome += transaction.price;
        }
        acc.total = acc.income - acc.outcome;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    )
  }, [transactions])

  return {
    income: formatCurrency(income),
    outcome: formatCurrency(outcome),
    total: formatCurrency(total),
  };
}
