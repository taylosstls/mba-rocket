import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent } from "./styles";

import logoImg from '../../../assets/logos/ignite.svg';

import { Button } from "../../atoms/Button";

import { NewTransactionModal } from '../../molecules/NewTransactionModal';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="Logo Ignite" />

          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <Button onClick={() => setIsOpen(true)}>
                Nova Transação
              </Button>
            </Dialog.Trigger>

            <NewTransactionModal setIsOpen={setIsOpen} />
          </Dialog.Root>
        </HeaderContent>
      </HeaderContainer>
    </>
  )
}