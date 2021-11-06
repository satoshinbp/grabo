import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Box, HStack, VStack, Pressable, Text, Avatar, FlatList } from 'native-base'
import groups from '../utils/groups'

export default () => {
  const { user } = useSelector((state) => state.auth)
  const navigation = useNavigation()

  return (
    <>
      <Box mx="3" my="2">
        <Text fontSize="md" bold>
          List of language groups that you speak
        </Text>
      </Box>
      <FlatList
        data={groups.filter((group) => user.groups.includes(group.code))}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              navigation.navigate('Group', { language: item.language, code: item.code })
            }}
          >
            <Box
              mx="2"
              mt={index === 0 ? 1.5 : 0}
              mb="3"
              px="3.5"
              py="2.5"
              borderLeftWidth="10"
              borderColor="primary.500"
              borderRadius="md"
              bg="white"
              shadow={2}
            >
              <HStack space={3} justifyContent="space-between">
                <Avatar size="48px" source={{ uri: item.image }} />
                <VStack flex={1}>
                  <Text fontSize="md" bold>
                    {item.language}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.code}
      />
    </>
  )
}
