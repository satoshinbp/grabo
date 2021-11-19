import React from 'react'
import { Box, HStack, Image, StatusBar, SunIcon, useTheme } from 'native-base'

export default () => {
  const { colors } = useTheme()

  return (
    <>
      <StatusBar backgroundColor={colors.primary[500]} barStyle="dark-content" />
      <Box safeAreaTop bg="white">
        <HStack px={3} py={2} alignItems="center" justifyContent="space-between" bg="white">
          <Image source={require('../assets/icons/logo-lg.png')} alt="logo" h="48px" w="112px" resizeMode="contain" />
          <SunIcon size="5" mt="0.5" color="black" />
        </HStack>
      </Box>
    </>
  )
}
