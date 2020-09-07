import styled from 'styled-components'
import { theme } from '@chakra-ui/core'

export const Table = styled.table`
  width: 100%;
  td,
  th {
    transition: all 0.2s;
    color: ${({ isLoading }) => (isLoading ? 'transparent !important' : '')};
  }
`

export const Thead = styled.thead``

export const Tr = styled.tr`
  height: 48px;
`

export const Th = styled.th`
  text-align: left;
  padding: 0px 16px;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.colors.gray[500]};
`

export const Tbody = styled.tbody`
  box-shadow: 2px 4px 6px rgba(113, 128, 150, 0.16);
  background: white;
  transition: all 0.2s ease-out;
  border-radius: 4px;

  &.fade-out {
    box-shadow: 0 3px 6px rgba(113, 128, 150, 0),
      0 3px 6px rgba(113, 128, 150, 0);
    tr {
      opacity: 0;
    }
  }

  &:hover {
    background: #9c302e;
    td {
      color: ${theme.colors.gray[400]};
    }
  }

  tr {
    transition: all 0.2s ease-out;
    background: white;
    border-bottom: 1px solid ${theme.colors.gray[200]};

    &:first-child {
      td:first-child {
        border-top-left-radius: 4px;
      }

      td:last-child {
        border-top-right-radius: 4px;
      }
    }

    &:last-child {
      td:first-child {
        border-bottom-left-radius: 4px;
      }

      td:last-child {
        border-bottom-right-radius: 4px;
      }
    }

    &:hover {
      transform: translate(16px);
      box-shadow: -3px 0px 5px rgba(156, 48, 46, 0.22);

      td {
        cursor: pointer;
        color: ${theme.colors.gray[800]} !important;
      }
    }
  }
`

export const Td = styled.td`
  padding: 0px 16px;
  color: ${theme.colors.gray[500]};
  font-weight: 400;

  &:first-child {
    color: ${theme.colors.gray[700]};
    text-transform: capitalize;
  }
`

export const Link = styled.a`
  background: red;
`
