import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Box, VStack, Text, Avatar, SunIcon } from 'native-base'
import { logout } from '../features/auth'
import ListItemBarPlain from '../elements/ListItemBarPlain'
import Modal from '../elements/Modal'

export default () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)

  const menu = [
    { text: 'Account Info', icon: <SunIcon size={8} />, onPress: () => console.log('btn pressed') },
    { text: 'Settings', icon: <SunIcon size={8} />, onPress: () => console.log('btn pressed') },
    { text: 'Logout', icon: <SunIcon size={8} />, onPress: () => setModalOpen(true) },
  ]

  return (
    <View variant="wrapper">
      <VStack alignItems="center" space={1} mb={3}>
        <Box position="absolute" top={0} h="128px" w="100%" my={2} borderRadius="md" bg="primary.500" />
        <View h="64px" />
        <Avatar
          source={{ uri: user.image }}
          size="2xl"
          alt="user portrait"
          position="relative"
          alignSelf="center"
          borderRadius="full"
        />
        <Text fontSize="lg" bold>
          {user.name}
        </Text>
        <Text fontSize="sm" color="darkText">
          {user.email}
        </Text>
      </VStack>

      <View>
        {menu.map(({ text, icon, onPress }) => (
          <ListItemBarPlain text={text} icon={icon} onPress={onPress} />
        ))}
      </View>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        body="Are you sure to logout from Grabo?"
        action={() => dispatch(logout())}
      />
    </View>
  )
}
