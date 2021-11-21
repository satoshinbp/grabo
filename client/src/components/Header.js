import React from 'react'
import { Box, Center, HStack, Image, StatusBar, useTheme } from 'native-base'
import NotificationIcon from '../assets/icons/Notification'

export default () => {
  const { colors } = useTheme()

  return (
    <>
      <StatusBar backgroundColor={colors.primary[500]} barStyle="dark-content" />
      <Box safeAreaTop bg="white" shadow={2}>
        <HStack px={3} py={2} alignItems="center" justifyContent="space-between" bg="white">
          <Image source={require('../assets/icons/logo-lg.png')} alt="logo" h="48px" w="112px" resizeMode="contain" />

          <Center size={8}>
            <NotificationIcon width="20px" />
          </Center>
        </HStack>
      </Box>
    </>
  )
}
