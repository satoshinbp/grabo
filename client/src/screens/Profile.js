import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Heading, Text } from 'native-base'
import Login from '../components/Login'
import Logout from '../components/Logout'

export default () => {
  const { user } = useSelector((state) => state.user)

  if (!user.googleId) return <Login />
  return (
    <Box>
      <Heading>Profile</Heading>
      <Text>Name: {user.name}</Text>
      <Logout />
    </Box>
  )
}
