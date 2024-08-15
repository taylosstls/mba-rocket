import { useContext } from "react";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

import { SummaryContainer } from "./styles";

import { SummaryCard } from "../../molecules/SummaryCard";

import { TransactionsContext } from "../../../contexts/TransactionsContext";

import { useSummary } from "../../../hooks/useSummary";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const { income, outcome, total } = useSummary(transactions);

  return (
    <SummaryContainer>
      <SummaryCard
        title="Entradas"
        icon={<ArrowCircleUp size={32} color="#00b376" />}
        amount={income}
      />
      <SummaryCard
        title="Saídas"
        icon={<ArrowCircleDown size={32} color="#f75a68" />}
        amount={outcome}
      />
      <SummaryCard
        title="Total"
        icon={<CurrencyDollar size={32} color="#fff" />}
        amount={total}
        variant="green"
      />
    </SummaryContainer>
  );
}
