import { X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import { CloseButton, Content, Overlay } from './styles';

import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <Dialog.Title>Nova transação</Dialog.Title>

        <form onSubmit={() => { }}>
          <Input type="text" placeholder='Descrição' required />
          <Input type="number" placeholder='Preço' required />
          <Input type="text" placeholder='Categoria' required />

          <Button>Cadastrar</Button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}