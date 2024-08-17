import { useContextSelector } from 'use-context-selector';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as z from 'zod';

import {
  CloseButton,
  Content,
  Overlay,
  Spinner,
  TransactionType,
  TransactionTypeButton
} from './styles';

import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

import { TransactionsContext } from '../../../contexts/TransactionsContext';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

interface NewTransactionModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export function NewTransactionModal({ setIsOpen }: NewTransactionModalProps) {
  const createTransaction = useContextSelector(TransactionsContext, (context) => context.createTransaction);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: '' as 'income' | 'outcome'
    }
  })

  async function handleSearchTransactions(data: NewTransactionFormInputs) {
    await createTransaction(data)
    reset({
      description: '',
      price: 0,
      category: '',
      type: '' as 'income' | 'outcome'
    });

    setIsOpen(false);
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <Dialog.Title>Nova transação</Dialog.Title>

        <form onSubmit={handleSubmit(handleSearchTransactions)}>
          <Input
            type="text"
            placeholder='Descrição'
            required
            {...register('description')}
          />

          <Input
            type="number"
            placeholder='Preço'
            required
            {...register('price', { valueAsNumber: true })}
          />

          <Input
            type="text"
            placeholder='Categoria'
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name='type'
            render={({ field }) => {
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant='income' value='income' >
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ?
              <Spinner size={20} />
              :
              <>Cadastrar</>
            }
          </Button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}