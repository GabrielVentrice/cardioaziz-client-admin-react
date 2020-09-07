import styled from 'styled-components'
import { Text as ChakraText, theme, Heading } from '@chakra-ui/core'

export const Label = styled(ChakraText)`
  color: ${theme.colors.gray['500']};
  font-size: ${theme.fontSizes.sm};
  font-weight: 400;
  margin-top: ${theme.space[4]};
`

export const Text = styled(ChakraText)`
  color: ${theme.colors.gray['700']};
  font-weight: 500;
  font-size: ${theme.fontSizes.md};
`

export const Header = styled(Heading)`
  font-size: ${theme.fontSizes.md};
  font-weight: 400;
  color: ${theme.colors.gray['500']};
  margin-bottom: ${theme.space[8]};
`
