import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, Button } from 'native-base'
import Header from '../components/Header'
import GroupList from '../components/GroupList'

export default () => {
  const navigation = useNavigation()

  return (
    <>
      <Header />
      <GroupList />
      <Button variant="fab" onPress={() => navigation.navigate('SettingGroup')}>
        <Text variant="fab">Join / Leave Group</Text>
      </Button>
    </>
  )
}
