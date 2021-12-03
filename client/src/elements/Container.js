import React from 'react'
import { Box } from 'native-base'

export default ({ children }) => (
  <Box flex={1} my={3} bg="white" borderRadius="md" shadow={2}>
    {children}
  </Box>
)
