import { HeaderContainer, HeaderContent } from "./styles";

import logoImg from '../../../assets/logos/ignite.svg';

import { Button } from "../../atoms/Button";

export function Header() {
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="Logo Ignite" />

          <Button>Nova transação</Button>
        </HeaderContent>
      </HeaderContainer>
    </>
  )
}