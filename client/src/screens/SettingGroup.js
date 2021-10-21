import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VStack, HStack, Checkbox, Box, Heading, Button } from 'native-base'
import groups from '../utils/groups'
import { setLanguageGroup } from '../features/user'

export default () => {
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
            console.log(values)
            // dispatch(setLanguageGroup(values))
          }}
        >
          {' '}
          {groups.map((group) => (
            <Checkbox value={group.code} my=".5">
              {group.language}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </VStack>
      <Button>Save</Button>
    </Box>
  )
}
