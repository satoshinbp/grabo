import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, Box, Center, VStack, HStack, Checkbox, Text, Heading, Button } from 'native-base'
import { setProductsByGroup } from '../features/product'
import { updateUser } from '../features/auth'
import groupList from '../utils/groups'

export default () => {
  const navigation = useNavigation()

  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [groups, setGroups] = useState(user?.groups)

  const handleSave = () => {
    const params = { groups }
    dispatch(updateUser({ token, id: user._id, params }))
    dispatch(setProductsByGroup({ token, codes: groups }))

    navigation.navigate('GroupsTab', { screen: 'Groups' })
  }

  return (
    <ScrollView variant="wrapper">
      <VStack variant="container">
        <Heading size="md">Choose languages that you speak</Heading>
        <Checkbox.Group
          defaultValue={user?.groups}
          accessibilityLabel="choose language groups"
          onChange={(values) => setGroups(values)}
        >
          {groupList.map((group) => (
            <Box variant="listItemBar" borderLeftWidth="10px" alignSelf="stretch" key={group.code}>
              <HStack space={3} alignItems="center">
                <Center size={12} bg="primary.500" borderRadius="full">
                  <Text fontSize="xl" bold>
                    {group.code}
                  </Text>
                </Center>
                <Text fontSize="md" textAlign="center" bold>
                  {group.language}
                </Text>
                <Checkbox value={group.code} my={0.5} ml="auto" />
              </HStack>
            </Box>
          ))}
        </Checkbox.Group>
        <Button onPress={handleSave} size="fixed" alignSelf="center">
          Save
        </Button>
      </VStack>
    </ScrollView>
  )
}
