import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";

export function SearchForm() {
  return (
    <SearchFormContainer onSubmit={() => { }}>
      <Input type="text" placeholder="Busque por transações" />

      <Button className="transparent" type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </Button>
    </SearchFormContainer>
  )
}