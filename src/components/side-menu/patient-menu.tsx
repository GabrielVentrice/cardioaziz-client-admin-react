import React from 'react'
import { Flex } from '@chakra-ui/core'

import MenuButton from '../button-menu'

const PatientMenu = () => {
  return (
    <Flex direction="column">
      {/* <a href="/">
        <MenuButton icon="heart">Médicos</MenuButton>
      </a> */}
      <a href="/ver-exames">
        <MenuButton icon="file-text">Exames</MenuButton>
      </a>
    </Flex>
  )
}

export default PatientMenu
