import React, { useState } from 'react'
import { Flex, Grid, useDisclosure, Button } from '@chakra-ui/core'

import SideMenu from '../side-menu'

const DashboardStructure: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  return (
    <Flex height="100vh" width="100vw" backgroundColor="gray.200">
      <Button onClick={onOpen}>s</Button>
      <SideMenu isOpen={isOpen} onClose={onClose}></SideMenu>
      {children}
    </Flex>
  )
}

export default DashboardStructure
