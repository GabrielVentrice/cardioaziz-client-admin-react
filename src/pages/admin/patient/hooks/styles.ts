import styled, { css } from 'styled-components'
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

const dragActive = css`
  border-color: #78e5d5;
`

const dragReject = css`
  border-color: #e57878;
`

export const DropContainer = styled.div.attrs({ className: 'dropzone' })`
  border: 2px dashed ${theme.colors.gray['400']};
  border-radius: 4px;
  background: ${theme.colors.gray['100']};
  color: ${theme.colors.gray['500']};
  padding: 16px;
  width: 100%;

  cursor: pointer;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};

  &:hover {
    color: ${theme.colors.gray['600']};
    border-color: ${theme.colors.gray['600']};
  }
`

const messageColors = {
  default: '#999',
  error: '#e57878',
  sucess: '#78e5d5'
}

export const UploadMessage = styled.div`
  display: flex;
  color: ${props => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`

export const Container = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    & + li {
      margin-top: 15px;
    }
  }
`

export const UploadExamDiv = styled.div`
  padding: 16px;
`

export const OBS = styled.p`
  font-size: 13px;
  color: rgb(153, 153, 153);
`

export const OptionContainer = styled.div`
  padding: 8px 16px;
`

export const Click = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: #cccccc;

  &.active {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
  }
`

export const FileContainer = styled.div`
  padding: 8px 16px;
  p {
    margin: 0;
    padding: 0;
  }

  & svg {
    height: 48px;
  }

  & .card {
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 8px;

    & .flex-row {
      display: flex;
      flex-direction: flex-row;

      & .info {
        margin-left: 8px;
      }
    }
  }
`

export const Card = styled.div`
  &.hide {
    display: none;
  }
`

export const FileBox = styled.li`
  padding: 12px;
  border-radius: 4px;

  transition: all 0.3s ease-out;

  border: 1px solid rgba(0, 0, 0, 0.1);

  & .percentage {
    padding: 0 16px;
    p {
      margin: 0;
      color: #666;
    }
  }
`

export const SavedFileBox = styled.li`
  padding: 16px;
  border-radius: 4px;

  transition: all 0.3s ease-out;

  border: 1px solid rgba(0, 0, 0, 0.14) !important;

  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);

  background: white;

  & .percentage {
    padding: 0 16px;
    p {
      margin: 0;
      color: #666;
    }
  }
`

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  strong {
    font-weight: 500;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`

export const Preview = styled.div`
  width: 36px;
  height: 40px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 16px;
`
