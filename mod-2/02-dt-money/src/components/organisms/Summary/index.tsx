import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react';

import { SummaryContainer } from "./styles";
import { SummaryCard } from '../../molecules/SummaryCard';

export function Summary() {
  // Valores dinâmicos para os exemplos
  const entradas = "R$ 17.400,00";
  const saidas = "R$ 1.259,00";
  const total = "R$ 16.141,00";

  return (
    <SummaryContainer>
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
    </SummaryContainer>
  )
}