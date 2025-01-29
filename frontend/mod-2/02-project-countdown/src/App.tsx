import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'

import { GlobalStyle } from './styles/global'

import { Navigation } from './navigation'

import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
          <Navigation />
        </CyclesContextProvider>

        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}
