import { HeaderContainer } from "./styles"

import LogoIgnite from '../../../assets/images/logo-ignite.svg'
import { Scroll, Timer } from "phosphor-react"
import { NavLink } from "react-router-dom"

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt="Logo do Ignite" />

      <nav>
        <NavLink to="/">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
