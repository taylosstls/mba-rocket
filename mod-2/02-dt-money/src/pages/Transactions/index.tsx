import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

import { Header } from "../../components/organisms/Header";
import { Summary } from "../../components/organisms/Summary";
import { SearchForm } from "../../components/molecules/SearchForm";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td>Desenvolvimento de site</td>
              <td><PriceHighlight variant="income">R$ 12.000,00</PriceHighlight></td>
              <td>Venda</td>
              <td>13/04/2024</td>
            </tr>

            <tr>
              <td>Hamburguer</td>
              <td><PriceHighlight variant="outcome">- R$ 12.000,00</PriceHighlight></td>
              <td>Alimentação</td>
              <td>10/04/2024</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}