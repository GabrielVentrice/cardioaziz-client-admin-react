import React from 'react'
import { Flex } from '@chakra-ui/core'

import MenuButton from '../button-menu'

const AdminMenu = () => {
  return (
    <Flex direction="column">
      <MenuButton icon="phone">Pacientes</MenuButton>

      <MenuButton icon="plus-square">Médicos</MenuButton>

      <MenuButton icon="question">Exames</MenuButton>
    </Flex>
  )
}

export default AdminMenu
