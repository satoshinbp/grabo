import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, VStack, Checkbox, Text, Button } from 'native-base'
import groupList from '../utils/groups'
import { updateUser } from '../features/auth'

export default () => {
  const navigation = useNavigation()

  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [groups, setGroups] = useState(user.groups)
  // const [isError, setIsError] = useState(false)

  const handleSave = () => {
    // if (groups.length === 0) return setIsError(true)
    // setIsError(false)

    const params = { groups }
    dispatch(updateUser({ token, id: user._id, params }))

    navigation.navigate('Groups')
  }

  return (
    <View variant="wrapper">
      <VStack variant="container">
        <Checkbox.Group
          defaultValue={user.groups}
          accessibilityLabel="choose language groups"
          onChange={(values) => setGroups(values)}
        >
          {groupList.map((group) => (
            <Checkbox value={group.code} my={0.5}>
              {group.language}
            </Checkbox>
          ))}
        </Checkbox.Group>
        {/* {isError && <Text>You have to belong to at least one Group</Text>} */}
        <Button onPress={handleSave}>Save</Button>
      </VStack>
    </View>
  )
}
