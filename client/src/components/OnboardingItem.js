import React from 'react'
import { useWindowDimensions } from 'react-native'
import { View, VStack, Image, Text, Button } from 'native-base'

export default ({ item, setIsFirstLaunch }) => {
  const { width } = useWindowDimensions()

  return (
    <View variant="wrapper" w={width}>
      <VStack flex={1}>
        <Image flex={6} source={item.image} resizeMode="contain" justifyContent="center" />
        <Text flex={3} bold fontSize="lg" textAlign="center">
          {item.description}
        </Text>
        <View flex={1}>
          <Button variant="ghost" colorScheme="gray" alignSelf="flex-end" onPress={() => setIsFirstLaunch(false)}>
            Skip
          </Button>
        </View>
      </VStack>
    </View>
  )
}
