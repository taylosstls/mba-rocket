import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'

import { GlobalStyle } from './styles/global'

import { Navigation } from './navigation'

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Navigation />

        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}
