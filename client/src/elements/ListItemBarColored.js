import React from 'react'
import { Box, Center, VStack, HStack, Pressable, Text } from 'native-base'

export default ({ text, subtext, icon, onPress, textColor, productIcon, code }) => (
  <Pressable onPress={onPress}>
    <Box variant="listItemBarColored">
      <HStack space={3} alignItems="center">
        <Center size={12} bg="primary.500" borderRadius="full">
          <Text fontSize="md" bold>
            {code}
          </Text>
        </Center>
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
    </Box>
  </Pressable>
)
