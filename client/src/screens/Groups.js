import React from 'react'
import { View, VStack, Divider, Heading, Text, Button } from 'native-base'
import GroupList from '../components/GroupList'

export default () => {
  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <VStack alignItems="center" space={4} w="100%" h="100%" mt={4} divider={<Divider />}>
        <Heading>Groups</Heading>
        <GroupList />
        <Button>Join New Group</Button>
      </VStack>
    </View>
  )
}
