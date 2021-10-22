import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, VStack, HStack, Checkbox, Box, Heading, Button } from 'native-base'
import grouplists from '../utils/groups'
import { updateGroup } from '../features/user'

export default () => {
  const [groups, setGroups] = useState([])
  const user = useSelector((state) => state.user.value)
  const [isError, setIsError] = useState(false)
  const dispatch = useDispatch()

  const saveButtonHandling = () => {
    if (groups.length === 0) {
      return setIsError(true)
    }
    setIsError(false)
    dispatch(updateGroup(groups))
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
          onChange={(values) => {
            setGroups(values)
          }}
        >
          {' '}
          {grouplists.map((group) => (
            <Checkbox value={group.code} my=".5">
              {group.language}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </VStack>
      {isError && <Text> You have to belong to at least one Group</Text>}
      <Button onPress={saveButtonHandling}>Save</Button>
    </Box>
  )
}
