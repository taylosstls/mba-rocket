import { useContext } from "react";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

import { SummaryContainer } from "./styles";

import { SummaryCard } from "../../molecules/SummaryCard";

import { TransactionContext } from "../../../contexts/TransactionsContext";

import { calculateSummary } from "../../../utils/calculateSummary";

export function Summary() {
  const { transactions } = useContext(TransactionContext);

  const summary = calculateSummary(transactions);

  return (
    <SummaryContainer>
      <SummaryCard
        title="Entradas"
        icon={<ArrowCircleUp size={32} color="#00b376" />}
        amount={summary.income}
      />
      <SummaryCard
        title="Saídas"
        icon={<ArrowCircleDown size={32} color="#f75a68" />}
        amount={summary.outcome}
      />
      <SummaryCard
        title="Total"
        icon={<CurrencyDollar size={32} color="#fff" />}
        amount={summary.total}
        variant="green"
      />
    </SummaryContainer>
  );
}
