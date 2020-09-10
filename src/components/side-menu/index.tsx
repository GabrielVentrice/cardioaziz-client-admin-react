import React from 'react'
import {
  Heading,
  Avatar,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  Text
} from '@chakra-ui/core'
import { useAuth } from '../../hooks/AuthContext'

import ButtonMenu from '../button-menu'
import AdminMenu from './admin-menu'

import { role as constRole } from '../../utils/constants'

interface MenuProps {
  isOpen: boolean
  onClose: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay'
  ) => void
}

const SideMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth()

  console.log(user)

  function getRoleName(role) {
    switch (role) {
      case constRole.ADMIN:
        return 'admin'
      case constRole.PATIENT:
        return 'paciente'
      case constRole.DOCTOR:
        return 'médico'
    }
  }

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="2xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex flexDir="column" py={4} alignItems="center">
              <Avatar size="xl"></Avatar>

              <Heading as="h6" size="md" mt={4}>
                {user.username}
              </Heading>

              <Text color="gray.400" fontSize="md" fontWeight="400" mt={1}>
                {getRoleName(user.role)}
              </Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex
              width="100%"
              direction="column"
              justifyContent="space-between"
              height="90%"
              mt={5}
            >
              <AdminMenu></AdminMenu>

              <ButtonMenu onClick={signOut} icon="logOut">
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
