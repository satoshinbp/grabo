import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, Box, VStack, Text, Avatar } from 'native-base'
import { logout, updateUser } from '../features/auth'
import ListItemBar from '../elements/ListItemBar'
import FadeModal from '../elements/FadeModal'
import AccountIcon from '../assets/icons/Account'
import SettingIcon from '../assets/icons/Setting'
import LogoutIcon from '../assets/icons/Logout'

export default () => {
  const navigation = useNavigation()

  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)

  const menu = [
    { text: 'Account', icon: <AccountIcon width="26px" />, onPress: () => navigation.navigate('Account') },
    { text: 'Notification', icon: <SettingIcon width="26px" />, onPress: () => setNotificationModalOpen(true) },
    { text: 'Logout', icon: <LogoutIcon width="26px" />, onPress: () => setLogoutModalOpen(true) },
  ]

  const toggleNotification = () => {
    const params = { isNotificationOn: !user.isNotificationOn }
    dispatch(updateUser({ token, id: user._id, params }))
    setNotificationModalOpen(false)
  }

  return (
    <>
      <VStack alignItems="center" mb={3}>
        <Box position="absolute" top={0} h="128px" w="100%" borderBottomRadius="md" bg="primary.500" />
        <View h="64px" />
        <Avatar
          source={{ uri: user?.image }}
          size="2xl"
          alt="user portrait"
          position="relative"
          alignSelf="center"
          mb={2}
          borderRadius="full"
        />
        <Text fontSize="lg" bold>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text fontSize="sm" color="muted.500">
          {user?.email}
        </Text>
      </VStack>

      <View variant="wrapper">
        {menu.map(({ text, icon, onPress }) => (
          <ListItemBar key={text} text={text} icon={icon} onPress={onPress} />
        ))}
      </View>

      <FadeModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        title="Notification"
        content={user?.isNotificationOn ? 'Mute notification?' : 'Unmute notification?'}
        primaryAction={toggleNotification}
        primaryActionLabel={user?.isNotificationOn ? 'Mute' : 'Unmute'}
        secondaryAction={() => setNotificationModalOpen(false)}
        secondaryActionLabel="Cancel"
      />

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
    </>
  )
}
