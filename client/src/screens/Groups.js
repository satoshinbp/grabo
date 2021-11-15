import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Button, Heading } from 'native-base'
import GroupList from '../components/GroupList'

export default () => {
  const navigation = useNavigation()

  return (
    <View variant="wrapper">
      <Heading size="sm" my={2}>
        List of language groups that you speak
      </Heading>
      <GroupList />
      <Button variant="fab" onPress={() => navigation.navigate('Groups Setting')}>
        Join / Leave Group
      </Button>
    </View>
  )
}
