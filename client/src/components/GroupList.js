import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Button } from 'native-base'
import groups from '../utils/groups'
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
            navigation.navigate('Group', { group: item.language })
            dispatch(setProductsByGroup(item.code))
          }}
        >
          {item.label}
        </Button>
      )}
      keyExtractor={(item) => item.value}
    />
  )
}
