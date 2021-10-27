import React from 'react'
import { Box, Heading, Button } from 'native-base'
import GroupList from '../components/GroupList'
import { useNavigation } from '@react-navigation/native'

export default () => {
  const navigation = useNavigation()
  return (
    <Box>
      <Heading>Groups</Heading>
      <GroupList />
      <Button
        onPress={() => {
          navigation.navigate('SettingGroup')
        }}
      >
        Join New Group
      </Button>
    </Box>
  )
}
