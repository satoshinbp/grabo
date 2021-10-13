import React from 'react'
import { Box, Heading, Button } from 'native-base'
import GroupList from '../components/GroupList'

export default () => {
  return (
    <Box>
      <Heading>Groups</Heading>
      <GroupList />
      <Button>Join New Group</Button>
    </Box>
  )
}
