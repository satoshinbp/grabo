import React, { useRef } from 'react'
import { Animated, Dimensions } from 'react-native'
import { View, Box, FlatList, Button, Image, useTheme } from 'native-base'
import OnboardingItem from '../components/OnboardingItem'
import onboardingSlides from '../utils/onboardingSlides'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

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

  const Backdrop = ({ scrollX }) => {
    const inputRange = [0, (onboardingSlides.length - 1) * windowWidth]
    const left = scrollX.interpolate({
      inputRange,
      outputRange: [0, -(onboardingSlides.length - 1) * windowWidth * 0.25], // with parallax effect
      // outputRange: [0, -(onboardingSlides.length - 1) * windowWidth], // without parallax effect
      extrapolate: 'clamp',
    })
    return (
      <Animated.Image
        source={require('../assets/images/onboarding-background.png')}
        alt="wave"
        style={{
          width: (onboardingSlides.length - 1) * windowWidth * 0.25 + windowWidth, // with parallax effect
          // width: onboardingSlides.length * windowWidth + windowWidth, // without parallax effect
          height: windowHeight * 0.65,
          resizeMode: 'stretch',
          position: 'absolute',
          left,
        }}
      />
    )
  }

  return (
    <View flex={1} bg="lightText" pt="56px">
      <Backdrop scrollX={scrollX} />
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
