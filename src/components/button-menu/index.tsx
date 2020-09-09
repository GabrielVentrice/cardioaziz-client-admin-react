import React from 'react'
import { Button as ChackraButton } from '@chakra-ui/core'
import { Icons } from '@chakra-ui/core/dist/theme/icons'

interface ButtonProps {
  icon: Icons | React.ComponentType
  onClick?: (event: React.MouseEvent<any, MouseEvent>) => void
}

const ButtonMenu: React.FC<ButtonProps> = ({ icon, onClick, children }) => {
  return (
    <ChackraButton
      onClick={onClick}
      leftIcon={icon}
      variant="link"
      padding={4}
      fontSize="lg"
      fontWeight="400"
      _hover={{ color: 'red.900' }}
      alignItems="center"
      justifyContent="start"
      color="gray.600"
    >
      {children}
    </ChackraButton>
  )
}
export default ButtonMenu
