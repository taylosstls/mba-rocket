import { createContext, ReactNode, useEffect, useState } from "react";

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
}

export const TransactionContext = createContext({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3333/transactions");
    const data: Transaction[] = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
}
