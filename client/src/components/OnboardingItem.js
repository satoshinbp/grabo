import React from 'react'
import { Dimensions } from 'react-native'
import { View, VStack, Image, Text } from 'native-base'

const windowWidth = Dimensions.get('window').width

export default ({ item }) => (
  <View variant="wrapper" w={windowWidth}>
    <VStack flex={1}>
      <Image flex={0.7} source={item.image} resizeMode="contain" justifyContent="center" />
      <Text flex={0.3} bold fontSize="lg" textAlign="center">
        {item.description}
      </Text>
    </VStack>
  </View>
)
