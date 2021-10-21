import React, { useState } from 'react'
import { VStack, HStack, Checkbox, Box, Heading, Button } from 'native-base'
import GroupList from '../components/GroupList'
import groups from '../utils/groups'

export const SettingGroup = () => {
  const [selectedGroup, setSelectedGroup] = useState([])

  return (
    <Box>
      <VStack space={2}>
        <HStack alignItems="baseline">
          <Heading fontSize="lg">Language Group</Heading>
        </HStack>
        <Checkbox.Group
          colorScheme="green"
          defaultValue={groups}
          accessibilityLabel="choose language groups"
          onChange={(values) => {
            setSelectedGroup(values || [])
          }}
        >
          {' '}
          {groups.map((group) => (
            <Checkbox value={group} my=".5">
              {group.language}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </VStack>
      <Button>Save</Button>
    </Box>
  )
}
