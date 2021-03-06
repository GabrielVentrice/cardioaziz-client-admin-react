import { theme, DefaultTheme } from '@chakra-ui/core'
import { customIcons } from './custom-icons'

const customTheme: DefaultTheme = {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons
  },
  fonts: {
    body: 'Helvetica, sans-serif',
    heading: 'Helvetica, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700
  },
  radii: {
    ...theme.radii,
    md: '4px'
  },
  fontSizes: {
    ...theme.fontSizes
  },
  colors: {
    ...theme.colors,
    red: {
      ...theme.colors.red,
      500: '#7d2524',
      900: '#9c302e'
    }
  }
}

export default customTheme
