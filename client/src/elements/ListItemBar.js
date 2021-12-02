import React from 'react'
import { Box, Center, VStack, HStack, Pressable, Text } from 'native-base'

export default ({ text, subtext, icon, onPress, textColor, productIcon, code, borderLeftWidth }) => (
  <Pressable variant="listItemBar" onPress={onPress} borderLeftWidth={borderLeftWidth} _pressed={{ bg: `muted.300` }}>
    <HStack space={3} alignItems="center">
      {icon && (
        <Center size={12} bg="primary.500" borderRadius="full">
          {icon}
        </Center>
      )}
      {code && (
        <Center size={12} bg="primary.500" borderRadius="full">
          <Text fontSize="xl" bold>
            {code}
          </Text>
        </Center>
      )}
      <VStack flex={1}>
        <Text fontSize={subtext ? 'sm' : 'md'} bold color={textColor}>
          {text}
        </Text>
        {subtext && (
          <Text fontSize="sm" color="darkText">
            {subtext}
          </Text>
        )}
      </VStack>
      {productIcon && <Center size={12}>{productIcon}</Center>}
    </HStack>
  </Pressable>
)