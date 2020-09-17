import React from 'react'

import {
  ThemeProvider as ChakraThemeProvider,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core'

import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'

import theme from '../styles/theme'

import { GlobalStyle } from '../styles/global'

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider value="light">
        <EmotionThemeProvider theme={theme}>
          <GlobalStyle />
          <CSSReset></CSSReset>
          {children}
        </EmotionThemeProvider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  )
}

export default ThemeContainer
