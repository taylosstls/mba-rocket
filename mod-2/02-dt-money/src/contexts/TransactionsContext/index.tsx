import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";

import { api } from "../../lib/axios";

export interface CreateTransactionInput {
  description: string;
  category: string;
  price: number;
  type: "income" | "outcome";
}

export interface Transaction extends CreateTransactionInput {
  id: number;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data);
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const { category, description, price, type } = data

    const response = await api.post('transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    // Ordena na ordem da mais recente
    setTransactions((state) => [response.data, ...state]);
  }, [])

  const deleteTransaction = useCallback(async (id: number) => {
    await api.delete(`transactions/${id}`)

    // Faz o filtro e remove a transação da lista
    setTransactions((state) => state.filter(transaction => transaction.id !== id));
  }, [])

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
      deleteTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}
