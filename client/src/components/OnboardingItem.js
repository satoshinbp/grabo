import React from 'react'
import { useWindowDimensions } from 'react-native'
import { Center, Image, Text, Button } from 'native-base'

export default ({ item, setIsFirstLaunch }) => {
  const { width } = useWindowDimensions()

  return (
    <Center flex={1} w={width} px="3">
      <Image flex={6} source={item.image} resizeMode="contain" justifyContent="center" />
      <Text flex={3} bold fontSize="lg" textAlign="center">
        {item.description}
      </Text>
      <Button
        flex={1}
        size="md"
        variant="ghost"
        colorScheme="gray"
        alignSelf="flex-end"
        onPress={() => setIsFirstLaunch(false)}
      >
        Skip
      </Button>
    </Center>
  )
}
