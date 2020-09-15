import React from 'react'
import { Flex } from '@chakra-ui/core'

import MenuButton from '../button-menu'

const AdminMenu = () => {
  const [url, setUrl] = React.useState(window.location.href)

  return (
    <Flex direction="column">
      <a href="/dashboard">
        <MenuButton icon="users" isActive={url.indexOf('/dashboard') !== -1}>
          Pacientes
        </MenuButton>
      </a>
      {/* <a href="/">
        <MenuButton icon="heart">Médicos</MenuButton>
      </a> */}
      {/* <a href="/exames">
        <MenuButton icon="file-text" isActive={url.indexOf('/exames') !== -1}>
          Exames
        </MenuButton>
      </a> */}
    </Flex>
  )
}

export default AdminMenu
