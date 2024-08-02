import { ReactNode, ComponentProps } from "react";
import { NewTransactionButton } from "./styles";

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <NewTransactionButton {...props}>
      {children}
    </NewTransactionButton>
  )
}
