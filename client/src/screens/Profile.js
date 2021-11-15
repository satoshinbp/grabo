import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Box, VStack, Text, Avatar, SunIcon } from 'native-base'
import { logout, updateUser } from '../features/auth'
import ListItemBarPlain from '../elements/ListItemBarPlain'
import FadeModal from '../elements/FadeModal'

export default () => {
  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)

  const menu = [
    { text: 'Account Info', icon: <SunIcon size={8} />, onPress: () => console.log('btn pressed') },
    { text: 'Settings', icon: <SunIcon size={8} />, onPress: () => setNotificationModalOpen(true) },
    { text: 'Logout', icon: <SunIcon size={8} />, onPress: () => setLogoutModalOpen(true) },
  ]

  const turnOnNotification = () => {
    const params = { isNotificationOn: true }
    dispatch(updateUser({ token, id: user._id, params }))
  }
  const turnOffNotification = () => {
    const params = { isNotificationOn: false }
    dispatch(updateUser({ token, id: user._id, params }))
  }

  return (
    <View variant="wrapper">
      <VStack alignItems="center" space={1} mb={3}>
        <Box position="absolute" top={0} h="128px" w="100%" my={2} borderRadius="md" bg="primary.500" />
        <View h="64px" />
        <Avatar
          source={{ uri: user?.image }}
          size="2xl"
          alt="user portrait"
          position="relative"
          alignSelf="center"
          borderRadius="full"
        />
        <Text fontSize="lg" bold>
          {user?.name}
        </Text>
        <Text fontSize="sm" color="darkText">
          {user?.email}
        </Text>
      </VStack>

      <View>
        {menu.map(({ text, icon, onPress }) => (
          <ListItemBarPlain text={text} icon={icon} onPress={onPress} />
        ))}
      </View>

      <FadeModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Logout"
        content="Are you sure to logout from Grabo?"
        primaryAction={() => dispatch(logout())}
        primaryActionLabel="Logout"
        secondaryAction={() => setLogoutModalOpen(false)}
        secondaryActionLabel="Cancel"
      />

      <FadeModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        title="Notification"
        content="Mute Notification?"
        primaryAction={turnOffNotification}
        primaryActionLabel="Mute"
        secondaryAction={turnOnNotification}
        secondaryActionLabel="On"
      />
    </View>
  )
}
