import styled, { keyframes } from "styled-components";
import { SpinnerGap } from "phosphor-react";

import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, .75);
`;

export const Content = styled(Dialog.Content)`
  max-width: 32rem;
  width: 100%;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background-color: ${props => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const CloseButton = styled(Dialog.Close)`
  cursor: pointer;
  background-color: transparent;
  border-radius: 6px;
  border: 0 none;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  position: absolute;
  color: ${props => props.theme['gray-500']};
  transition: all .3s;
  
  &:hover {
    color: ${props => props.theme['gray-300']};
  }
`;

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: .5rem 0 1rem;
`;

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(RadioGroup.Item) <TransactionTypeButtonProps>`
  background-color: ${props => props.theme['gray-700']};
  color: ${props => props.theme['gray-300']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  transition: all .3s;

  &:hover {
    background-color: ${props => props.theme['gray-600']};
  }

  svg {
    color: ${props => props.variant === 'income' ?
    props.theme['green-500'] :
    props.theme['red-500']};
  }

  &[data-state='checked'] {
    color: ${props => props.theme.white};
    background-color: ${props => props.variant === 'income' ?
    props.theme['green-500'] :
    props.theme['red-500']};

    svg {
      color: ${props => props.theme.white};
    }
  }

`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled(SpinnerGap)`
  animation: ${spin} 1s linear infinite;
`;