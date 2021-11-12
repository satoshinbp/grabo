import React, { useRef } from 'react'
import { Animated, Dimensions, StyleSheet } from 'react-native'
import { View, Box, FlatList, Button } from 'native-base'
import OnboardingItem from '../components/OnboardingItem'
import onboardingSlides from '../utils/onboardingSlides'

const windowWidth = Dimensions.get('window').width

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF']

const Indicator = ({ scrollX }) => (
  <Box
    position="absolute"
    flexDirection="row"
    alignSelf="center"
    bottom={20}
    p={2}
    borderWidth={1}
    borderColor="lightText"
    borderRadius="full"
  >
    {onboardingSlides.map((_, i) => {
      const inputRange = [(i - 1) * windowWidth, i * windowWidth, (i + 1) * windowWidth]
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.4, 0.8],
        extrapolate: 'clamp',
      })
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.6, 0.9, 0.6],
        extrapolate: 'clamp',
      })
      return (
        <View
          key={`indicator-${i}`}
          w="10px"
          h="10px"
          m={2}
          borderRadius="md"
          bg="primary.500"
          // transform={[{ scale }]}
          // style={{ opacity }}
        />
      )
    })}
  </Box>
)

const Backdrop = ({ scrollX }) => {
  const inputRange = [1 * windowWidth, 2 * windowWidth, 3 * windowWidth]

  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * windowWidth),
    outputRange: bgs.map((bg) => bg),
  })
  return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />
}

export default ({ setIsFirstLaunch }) => {
  const scrollX = useRef(new Animated.Value(0)).current
  console.log(scrollX)

  return (
    <View flex={1} bg="lightText">
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        data={onboardingSlides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
      />
      <Indicator scrollX={scrollX} />
      <Button
        variant="ghost"
        colorScheme="gray"
        position="absolute"
        bottom={8}
        right={5}
        onPress={() => setIsFirstLaunch(false)}
      >
        Skip
      </Button>
    </View>
  )
}
