import React, { MouseEventHandler } from 'react'
import {
  Heading,
  Avatar,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  Button
} from '@chakra-ui/core'
import { useAuth } from '../../hooks/AuthContext'

import ButtonMenu from '../button-menu'
import AdminMenu from './admin-menu'

const variants = {
  open: { opacity: 1, x: 0, width: 'auto' },
  closed: { opacity: 0, x: -224, width: 0 }
}

interface MenuProps {
  isOpen: boolean
  onClose: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay'
  ) => void
}

const SideMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth()

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Avatar size="lg"></Avatar>

            <Heading as="h6" size="xs">
              teste
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <Flex
              width="100%"
              direction="column"
              justifyContent="space-between"
              mt={10}
              height="90%"
            >
              <AdminMenu></AdminMenu>

              <ButtonMenu onClick={signOut} icon="arrow-back">
                Logout
              </ButtonMenu>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
    /* </>
    <Flex
      width="192px"
      direction="column"
      alignItems="center"
      textAlign="center"
    >
      

      
    </Flex> */
  )
}

export default SideMenu
