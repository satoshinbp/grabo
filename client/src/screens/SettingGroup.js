import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VStack, HStack, Checkbox, Box, Heading, Button } from 'native-base'
import grouplists from '../utils/groups'
import { updateGroup } from '../features/user'

export default () => {
  const [groups, setGroups] = useState([])
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
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
      <Button onPress={() => dispatch(updateGroup(groups))}>Save</Button>
    </Box>
  )
}
