import React from 'react'
import { useRoute } from '@react-navigation/core'
import { Box, Heading } from 'native-base'

export default () => {
  const route = useRoute()

  return (
    <Box>
      <Heading>{route.params.product}</Heading>
    </Box>
  )
}
