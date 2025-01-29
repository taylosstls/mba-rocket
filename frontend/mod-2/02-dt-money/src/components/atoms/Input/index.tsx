import { ComponentProps, forwardRef } from 'react';
import { InputContainer } from './styles';

interface InputProps extends ComponentProps<'input'> { }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <InputContainer {...props} ref={ref} />;
  });