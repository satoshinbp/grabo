import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Text, VStack, HStack, Checkbox, Box, Heading, Button } from 'native-base'
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
    <Box>
      <VStack space={2}>
        <HStack alignItems="baseline">
          <Heading fontSize="lg">Language Group</Heading>
        </HStack>
        <Checkbox.Group
          colorScheme="green"
          defaultValue={user.groups}
          accessibilityLabel="choose language groups"
          onChange={(values) => setGroups(values)}
        >
          {grouplists.map((group) => (
            <Checkbox value={group.code} my=".5">
              {group.language}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </VStack>
      {isError && <Text> You have to belong to at least one Group</Text>}
      <Button onPress={handleSave}>Save</Button>
    </Box>
  )
}
