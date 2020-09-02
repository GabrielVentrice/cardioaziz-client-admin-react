import React from 'react'
import { Flex } from '@chakra-ui/core'

const Card: React.FC = ({ ...rest }) => {
  return (
    <Flex
      background="white"
      borderRadius="md"
      boxShadow="0px 1px 3px rgba(0,0,0,0.22)"
      {...rest}
      width="100%"
    >
      Card
    </Flex>
  )
}

export default Card
