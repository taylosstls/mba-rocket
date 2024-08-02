import { ReactNode } from "react";
import { SummaryCardContainer } from "./styles";

interface SummaryCardProps {
  title: string;
  icon: ReactNode;
  amount: string;
  variant?: 'green';
}

export function SummaryCard({ title, icon, amount, variant }: SummaryCardProps) {
  return (
    <SummaryCardContainer variant={variant}>
      <header>
        <span>{title}</span>
        {icon}
      </header>
      <strong>{amount}</strong>
    </SummaryCardContainer>
  );
}