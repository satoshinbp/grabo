import React, { useRef } from 'react'
import { Animated, Dimensions, StyleSheet } from 'react-native'
import { View, Box, FlatList, Button, Image, useTheme } from 'native-base'
import OnboardingItem from '../components/OnboardingItem'
import onboardingSlides from '../utils/onboardingSlides'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

// const Square = ({ scrollX }) => {
//   const YOLO = Animated.modulo(
//     Animated.divide(Animated.modulo(scrollX, windowWidth), new Animated.Value(windowWidth)),
//     1
//   )
//   const rotate = YOLO.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: ['35deg', '0deg', '35deg'],
//   })
//   const translateX = YOLO.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [0, -windowHeight, 0],
//   })
//   return (
//     <Animated.View
//       style={{
//         position: 'absolute',
//         top: -windowHeight * 0.6,
//         left: -windowHeight * 0.3,
//         width: windowHeight,
//         height: windowHeight,
//         borderRadius: 86,
//         backgroundColor: '#fff',
//         transform: [{ rotate }, { translateX }],
//       }}
//     />
//   )
// }

// const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF']
// const Backdrop = ({ scrollX }) => {
//   const backgroundColor = scrollX.interpolate({
//     inputRange: bgs.map((_, i) => i * windowWidth),
//     outputRange: bgs.map((bg) => bg),
//   })
//   return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />
// }

export default ({ setIsFirstLaunch }) => {
  const scrollX = useRef(new Animated.Value(0)).current
  const { colors } = useTheme()

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
          <Animated.View
            key={`indicator-${i}`}
            style={{
              width: 10,
              height: 10,
              margin: 8,
              borderRadius: 5,
              backgroundColor: colors.primary[500],
              transform: [{ scale }],
              opacity,
            }}
          />
        )
      })}
    </Box>
  )

  return (
    <View flex={1} bg="lightText">
      {/* <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} /> */}
      <Image
        source={require('../assets/images/onboarding-background.png')}
        alt="wave"
        w={windowWidth * onboardingSlides.length}
        h={windowHeight / 2}
        position="absolute"
      />
      <Animated.FlatList
        data={onboardingSlides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.alt}
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
