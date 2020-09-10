import styled from 'styled-components'
import { Flex as ChakraFlex, theme } from '@chakra-ui/core'

export const Flex = styled(ChakraFlex)`
  .pagination {
    li {
      display: inline-block;

      a {
        transition: all 0.2s;
        box-shadow: 2px 4px 6px rgba(113, 128, 150, 0.16);
        font-size: ${theme.fontSizes.sm};
        background: white;
        margin-left: 8px;
        border-radius: 4px;
        padding: 8px 12px;
        font-weight: 400;
        color: ${theme.colors.gray['500']};

        &:hover {
          background: ${theme.colors.red['800']};
          color: white;
        }
      }

      &.active {
        a {
          background: ${theme.colors.red['800']};
          color: white;
        }
      }
    }
  }
`
