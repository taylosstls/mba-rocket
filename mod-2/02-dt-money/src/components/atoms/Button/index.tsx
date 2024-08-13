import { ReactNode, ComponentProps } from "react";
import { StyledButton } from "./styles";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  className?: "primary" | "transparent";
}

export function Button({
  children,
  className = "primary",
  ...props
}: ButtonProps) {
  return (
    <StyledButton className={className} {...props}>
      {children}
    </StyledButton>
  );
}
