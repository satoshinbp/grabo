import React, { useState, useEffect } from 'react'
import { Box, Center, HStack, Image, StatusBar, useTheme, Pressable } from 'native-base'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NotificationIcon from '../assets/icons/Notification'
import BellIconWithCircle from '../assets/icons/BellWithCircle'

export default () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { user } = useSelector((state) => state.auth)
  const { notifications } = user
  const [haveUnreadNotification, setHaveUnreadNotification] = useState(false)

  useEffect(() => {
    const checkUnreadNotification = notifications.map((notification) => notification.read).includes(false)
    setHaveUnreadNotification(!checkUnreadNotification)
  }, [notifications])

  return (
    <>
      <StatusBar backgroundColor={colors.primary[500]} barStyle="dark-content" />
      <Box safeAreaTop bg="white" shadow={2} borderRadius="md">
        <HStack justifyContent="space-between" alignItems="center" px={3} py={2}>
          <Image source={require('../assets/icons/logo-lg.png')} alt="logo" h="48px" w="112px" resizeMode="contain" />

          <Pressable variant="icon" onPress={() => navigation.navigate('Notification')}>
            <Center size="8">
              {haveUnreadNotification ? <BellIconWithCircle width="20px" /> : <NotificationIcon width="20px" />}
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </>
  )
}
