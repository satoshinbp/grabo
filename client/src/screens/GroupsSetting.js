import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, VStack, Checkbox, Text, Button } from 'native-base'
import grouplists from '../utils/groups'
import { updateGroup } from '../features/auth'

export default () => {
  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [groups, setGroups] = useState([])
  const [isError, setIsError] = useState(false)

  const handleSave = () => {
    if (groups.length === 0) return setIsError(true)

    setIsError(false)

    const params = {
      groups: groups,
      user_id: user._id,
    }
    dispatch(updateGroup({ token, params }))
    navigation.navigate('Groups')
  }

  return (
    <View variant="wrapper">
      <VStack space={2} alignItems="center">
        <Checkbox.Group
          defaultValue={user.groups}
          accessibilityLabel="choose language groups"
          onChange={(values) => setGroups(values)}
        >
          {grouplists.map((group) => (
            <Checkbox value={group.code} my={0.5}>
              {group.language}
            </Checkbox>
          ))}
        </Checkbox.Group>
        {isError && <Text>You have to belong to at least one Group</Text>}
        <Button w="232px" onPress={handleSave}>
          Save
        </Button>
      </VStack>
    </View>
  )
}
