import React from 'react'
import { Box, Center, VStack, HStack, Pressable, Text } from 'native-base'

export default ({ text, subtext, icon, subIcon, onPress, borderLeft, textColor }) => {
  const content = (
    <HStack space={3} alignItems="center">
      {icon && (
        <Center size={12} bg="primary.500" borderRadius="full">
          {icon}
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
      {subIcon && <Center size={12}>{subIcon}</Center>}
    </HStack>
  )

  return onPress ? (
    <Pressable
      variant="listItemBar"
      onPress={onPress}
      borderLeftWidth={borderLeft ? '10px' : 0}
      _pressed={{ bg: `muted.300` }}
    >
      {content}
    </Pressable>
  ) : (
    <Box variant="listItemBar" borderLeftWidth={borderLeft ? '10px' : 0}>
      {content}
    </Box>
  )
}
