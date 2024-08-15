import { ReactNode, ComponentProps, forwardRef } from "react";
import { StyledButton } from "./styles";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  className?: "primary" | "transparent";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = 'primary', ...props }, ref) => {
    return (
      <StyledButton className={className} {...props} ref={ref}>
        {children}
      </StyledButton>
    );
  }
);