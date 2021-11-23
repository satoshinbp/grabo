import React from 'react'
import { Box } from 'native-base'

export default ({ children }) => (
  <Box flex={1} justifyContent="space-between" space={3} m={3} px={3} py={6} bg="white" borderRadius="md" shadow={2}>
    {children}
  </Box>
)
