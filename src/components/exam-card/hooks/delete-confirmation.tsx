import React from 'react'

import {
  Popover,
  Button,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup
} from '@chakra-ui/core'

import { PopoverContent } from './styles'

const DeleteConfirmation: React.FC = ({ delFunction }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  return (
    <>
      <Button
        id="crud-button"
        fontSize="sm"
        color="red.400"
        fontWeight="400"
        variantColor="red"
        variant="ghost"
        onClick={open}
        opacity={0}
      >
        excluir
      </Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverContent zIndex={4}>
          <PopoverHeader fontWeight="semibold">Excluir exame</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Você tem certeza que deseja excluir este exame?
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={close}>
                Cancelar
              </Button>
              <Button
                variantColor="red"
                onClick={() => {
                  delFunction()
                  close()
                }}
              >
                Excluir
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default DeleteConfirmation
