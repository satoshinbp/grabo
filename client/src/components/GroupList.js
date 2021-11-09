import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, Box, Center, HStack, VStack, Pressable, Text, SunIcon, FlatList } from 'native-base'
import groups from '../utils/groups'

export default () => {
  const { user } = useSelector((state) => state.auth)
  const navigation = useNavigation()

  return (
    <View mx={3} flex={1}>
      <Box my={2}>
        <Text fontSize="md" bold>
          List of language groups that you speak
        </Text>
      </Box>
      <FlatList
        data={groups.filter((group) => user?.groups?.includes(group.code))}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              navigation.navigate('Group', { language: item.language, code: item.code })
            }}
          >
            <Box index={index} variant="listItemColored">
              <HStack space={3} alignItems="center" justifyContent="space-between">
                <Center size={12} bg="primary.500" borderRadius="full">
                  <SunIcon size={8} />
                </Center>
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
    </View>
  )
}
