import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, VStack, Button, Heading } from 'native-base'
import Loading from '../components/Loading'
import GroupList from '../components/GroupList'

export default () => {
  const navigation = useNavigation()
  const { loading } = useSelector((state) => state.auth)

  if (loading) return <Loading />
  return (
    <View variant="wrapper">
      <VStack variant="container" flex={1}>
        <Heading size="md">List of languages that you speak</Heading>
        <GroupList />
      </VStack>

      <Button variant="fab" onPress={() => navigation.navigate('GroupsSetting')}>
        Join / Leave Group
      </Button>
    </View>
  )
}
