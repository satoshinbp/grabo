import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Box, Heading, Button } from 'native-base'
import GroupList from '../components/GroupList'

export default () => {
  const navigation = useNavigation()

  return (
    <Box>
      <Heading>Groups</Heading>
      <GroupList />
      <Button onPress={() => navigation.navigate('SettingGroup')}>Join New Group</Button>
    </Box>
  )
}
