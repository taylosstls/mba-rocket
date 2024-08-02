import { ReactNode } from "react";
import { SummaryContainer } from "./styles";

interface SummaryProps {
  children: ReactNode
}

export function Summary({ children }: SummaryProps) {
  return (
    <SummaryContainer>
      {children}
    </SummaryContainer>
  )
}