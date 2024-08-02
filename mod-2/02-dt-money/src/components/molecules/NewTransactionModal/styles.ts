import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';

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