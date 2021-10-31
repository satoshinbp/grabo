import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Button } from 'native-base'
import groups from '../utils/groups'

export default () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <FlatList
      data={groups.filter(group => user.groups.includes(group.code))}
      renderItem={({ item }) => (
        <Button
          onPress={() => {
            navigation.navigate('Group', { language: item.language, code: item.code })
          }}
        >
          {item.language}
        </Button>
      )}
      keyExtractor={item => item.code}
    />
  )
}
