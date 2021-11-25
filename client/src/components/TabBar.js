import React from 'react'
import { Center, View, Pressable, Text } from 'native-base'

export default ({ state, descriptors, navigation }) => {
  return (
    <View h="56px" flexDirection="row" bg="white" shadow={2}>
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

        const Icon = options.tabBarIcon !== undefined ? options.tabBarIcon : () => null

        return (
          <Pressable flex={1} onPress={onPress}>
            <Center height="100%">
              <Center borderRadius="md" size="8" bgColor={isFocused ? 'primary.500' : 'white'}>
                <Icon width="20px" />
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
