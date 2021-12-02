import React from 'react'
import { Dimensions } from 'react-native'
import { View, VStack, Image, Text } from 'native-base'

const windowWidth = Dimensions.get('window').width

export default ({ item }) => (
  <View variant="wrapper" w={windowWidth}>
    <VStack variant="container" flex={1} alignItems="center" px={8}>
      <Image flex={0.7} w="100%" source={item.image} resizeMode="contain" alt={item.alt} />
      <Text flex={0.3} bold fontSize="lg" textAlign="center">
        {item.description}
      </Text>
    </VStack>
  </View>
)
