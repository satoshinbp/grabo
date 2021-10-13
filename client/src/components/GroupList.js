import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Button } from 'native-base'
import groups from '../mocks/groups'
import { setProductsByGroup } from '../features/products'

export default () => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <FlatList
      data={groups.filter((group) => user.groups.includes(group.value))}
      renderItem={({ item }) => (
        <Button
          onPress={() => {
            navigation.navigate('Group', { group: item.label })
            dispatch(setProductsByGroup(item.value))
          }}
        >
          {item.label}
        </Button>
      )}
      keyExtractor={(item) => item.value}
    />
  )
}
