import { NavLink } from 'react-router-dom'
import { Scroll, Timer } from 'phosphor-react'

import { HeaderContainer } from './styles'

import LogoIgnite from '../../../assets/images/logo-ignite.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt="Logo do Ignite" />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
