import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, Button, Heading } from 'native-base'
import Loading from '../components/Loading'
import GroupList from '../components/GroupList'

export default () => {
  const navigation = useNavigation()
  const { loading } = useSelector((state) => state.auth)

  if (loading) return <Loading />
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
