import { useContext } from "react";

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

import { SearchForm } from "../../components/molecules/SearchForm";

import { Header } from "../../components/organisms/Header";
import { Summary } from "../../components/organisms/Summary";

import { TransactionContext } from "../../contexts/TransactionsContext";

export function Transactions() {
  const { transactions } = useContext(TransactionContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              const formattedPrice = transaction.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              const createdAtDate = new Date(transaction.createdAt);
              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "-"} {formattedPrice}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{createdAtDate.toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
