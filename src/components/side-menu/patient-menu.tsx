import React from 'react'
import { Flex } from '@chakra-ui/core'

import MenuButton from '../button-menu'

const PatientMenu = () => {
  const [url, setUrl] = React.useState(window.location.href)

  return (
    <Flex direction="column">
      {/* <a href="/">
        <MenuButton icon="heart">Médicos</MenuButton>
      </a> */}
      <a href="/ver-exames">
        <MenuButton
          icon="file-text"
          isActive={url.indexOf('/ver-exames') !== -1}
        >
          Exames
        </MenuButton>
      </a>
    </Flex>
  )
}

export default PatientMenu
