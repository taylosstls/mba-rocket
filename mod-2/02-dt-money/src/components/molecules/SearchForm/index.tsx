import { useForm } from "react-hook-form";
import { MagnifyingGlass } from "phosphor-react";
import * as z from 'zod';

import { SearchFormContainer, Spinner } from "./styles";

import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    console.log(data)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <Input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <Button className="transparent" type="submit" disabled={isSubmitting}>
        {isSubmitting ?
          <Spinner size={20} />
          :
          <>
            <MagnifyingGlass size={20} />
            Buscar
          </>
        }

      </Button>
    </SearchFormContainer>
  )
}