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
import PatientMenu from './patient-menu'

import { role as constRole, role } from '../../utils/constants'

interface MenuProps {
  isOpen: boolean
  onClose: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay'
  ) => void
}

const SideMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth()

  console.log('user', user)

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

              <Heading
                as="h6"
                size="sm"
                mt={4}
                textAlign="center"
                textTransform="capitalize"
                color="gray.700"
              >
                {user.nome}
              </Heading>

              <Text color="gray.300" fontSize="md" fontWeight="400" mt={1}>
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
              {user.role === constRole.ADMIN && <AdminMenu></AdminMenu>}

              {user.role === constRole.PATIENT && <PatientMenu></PatientMenu>}

              <ButtonMenu onClick={signOut} icon="logOut">
                Logout
              </ButtonMenu>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideMenu
