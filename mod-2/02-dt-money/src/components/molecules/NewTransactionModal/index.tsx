import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as z from 'zod';

import { CloseButton, Content, Overlay, Spinner, TransactionType, TransactionTypeButton } from './styles';

import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleSearchTransactions(data: NewTransactionFormInputs) {
    console.log(data)
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