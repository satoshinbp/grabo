import React from 'react'
import { Box, HStack, Image, StatusBar, SunIcon } from 'native-base'

export default () => {
  return (
    <>
      <StatusBar backgroundColor="primary.500" barStyle="dark-content" />
      <Box safeAreaTop backgroundColor="white">
        <HStack px={3} py={3} alignItems="center" justifyContent="space-between" backgroundColor="white">
          <Image source={require('../assets/logo-long.png')} alt="logo" h={10} w={20} resizeMode="contain" />
          <SunIcon size="5" mt="0.5" color="black" />
        </HStack>
      </Box>
    </>
  )
}
