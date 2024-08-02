//import { } from "./styles";

import { ComponentProps } from "react";
import { InputContainer } from "./styles";

interface InputProps extends ComponentProps<'input'> { }

export function Input({ ...props }: InputProps) {
  return (
    <InputContainer {...props} />
  )
}