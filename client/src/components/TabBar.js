import React from 'react'
import { Center, View, Pressable, Text, SunIcon } from 'native-base'

export default ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        height: 56,
        flexDirection: 'row',
        backgroundColor: 'white',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        return (
          <Pressable flex={1} onPress={onPress}>
            <Center height="100%">
              <Center borderRadius="full" size="8" bgColor={isFocused ? 'primary.500' : 'white'}>
                <SunIcon size="5" mt="0.5" color="black" />
              </Center>
              <Text textAlign="center" fontSize="2xs" fontWeight={isFocused ? 'bold' : 'normal'}>
                {label}
              </Text>
            </Center>
          </Pressable>
        )
      })}
    </View>
  )
}