import { createGlobalStyle } from 'styled-components'
import { theme } from '@chakra-ui/core'

export const GlobalStyle = createGlobalStyle`
  *::-webkit-scrollbar {
    width: 4px;
	  background-color: transparent;
  }

  *::-webkit-scrollbar-track {
	  border-radius: 10px;
	  background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
	  background-color: ${theme.colors.gray['300']};
  }
`
