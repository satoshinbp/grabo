import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Box, Center, HStack, Pressable, Text, Avatar, SunIcon, ChevronRightIcon } from 'native-base'
import { logout } from '../features/auth'
import Header from '../components/Header'

export default () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <>
      <Header />
      <View variant="wrapper">
        <Center>
          <Box position="absolute" top={0} h={32} w="100%" my={2} borderRadius="md" bg="primary.400" />
        </Center>
        <View my={2} px={3}>
          <Text fontSize="lg" bold>
            {user?.name}
          </Text>
          <Text my={1} fontSize="sm" color="darkText">
            {user?.email}
          </Text>
        </View>
        <Avatar
          alignSelf="center"
          source={{ uri: user?.image }}
          size="2xl"
          alt="user portrait"
          borderRadius="full"
          position="relative"
        />
        <Pressable onPress={() => dispatch(logout())}>
          <Box index={0} variant="listItemPlain">
            <HStack space={3} alignItems="center">
              <Center size={12} bg="primary.500" borderRadius="full">
                <SunIcon size={8} />
              </Center>
              <Text fontSize="md" bold flex={1}>
                Logout
              </Text>
              <ChevronRightIcon size="5" mt="0.5" color="black" />
            </HStack>
          </Box>
        </Pressable>
      </View>
    </>
  )
}
