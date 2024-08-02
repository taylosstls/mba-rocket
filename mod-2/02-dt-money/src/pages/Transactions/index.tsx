import { SummaryCard } from "../../components/molecules/SummaryCard";
import { Header } from "../../components/organisms/Header";
import { Summary } from "../../components/organisms/Summary";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'; // Importando os ícones

export function Transactions() {
  // Valores dinâmicos para os exemplos
  const entradas = "R$ 17.400,00";
  const saidas = "R$ 1.259,00";
  const total = "R$ 16.141,00";

  return (
    <div>
      <Header />
      <Summary>
        <SummaryCard
          title="Entradas"
          icon={<ArrowCircleUp size={32} color="#00b376" />}
          amount={entradas}
        />
        <SummaryCard
          title="Saídas"
          icon={<ArrowCircleDown size={32} color="#f75a68" />}
          amount={saidas}
        />
        <SummaryCard
          title="Total"
          icon={<CurrencyDollar size={32} color="#fff" />}
          amount={total}
          variant="green"
        />
      </Summary>
    </div>
  )
}