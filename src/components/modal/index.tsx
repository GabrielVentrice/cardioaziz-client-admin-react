import React from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button
} from '@chakra-ui/core'

const Modal = ({ isOpen, onClose, title, acceptText, children }) => {
  return (
    <>
      <ChakraModal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={2}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="ghost">{acceptText}</Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export default Modal
