import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';

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

          <TransactionType>
            <TransactionTypeButton variant='income' value='income'>
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton variant='outcome' value='outcome'>
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <Button>Cadastrar</Button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}