import { useContext } from "react";

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

import { SearchForm } from "../../components/molecules/SearchForm";

import { Header } from "../../components/organisms/Header";
import { Summary } from "../../components/organisms/Summary";

import { TransactionsContext } from "../../contexts/TransactionsContext";
import { formatCurrency, formatDate } from "../../utils/formatter";

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "-"} {formatCurrency(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{formatDate(transaction.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
