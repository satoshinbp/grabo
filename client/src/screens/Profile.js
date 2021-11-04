import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Heading, Text } from 'native-base'
import Logout from '../components/Logout'

export default () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <Box>
      <Heading>Profile</Heading>
      <Text>Name: {user.name}</Text>
      <Logout />
    </Box>
  )
}
