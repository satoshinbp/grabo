import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'native-base'
import GroupList from '../components/GroupList'

export default () => {
  const navigation = useNavigation()

  return (
    <>
      <GroupList />
      <Button variant="fab" onPress={() => navigation.navigate('Groups Setting')}>
        Join / Leave Group
      </Button>
    </>
  )
}
