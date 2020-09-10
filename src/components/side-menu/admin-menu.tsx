import React from 'react'
import { Flex } from '@chakra-ui/core'

import MenuButton from '../button-menu'

const AdminMenu = () => {
  return (
    <Flex direction="column">
      <a href="/">
        <MenuButton icon="users">Pacientes</MenuButton>
      </a>
      {/* <a href="/">
        <MenuButton icon="heart">Médicos</MenuButton>
      </a> */}
      <a href="/exames">
        <MenuButton icon="file-text">Exames</MenuButton>
      </a>
    </Flex>
  )
}

export default AdminMenu
