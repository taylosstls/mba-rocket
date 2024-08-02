import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent } from "./styles";

import logoImg from '../../../assets/logos/ignite.svg';

import { Button } from "../../atoms/Button";

import { NewTransactionModal } from '../../molecules/NewTransactionModal';

export function Header() {
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="Logo Ignite" />

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button>
                Nova Transação
              </Button>
            </Dialog.Trigger>

            <NewTransactionModal />
          </Dialog.Root>
        </HeaderContent>
      </HeaderContainer>
    </>
  )
}