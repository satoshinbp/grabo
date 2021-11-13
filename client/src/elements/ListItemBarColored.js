import React from 'react'
import { Box, Center, VStack, HStack, Pressable, Text, ChevronRightIcon } from 'native-base'

export default ({ text, subtext, icon, onPress }) => (
  <Pressable onPress={onPress}>
    <Box variant="listItemBarColored">
      <HStack space={3} alignItems="center">
        <Center size={12} bg="primary.500" borderRadius="full">
          {icon}
        </Center>
        <VStack flex={1}>
          <Text fontSize={subtext ? 'sm' : 'md'} bold>
            {text}
          </Text>
          {subtext && (
            <Text fontSize="sm" color="darkText">
              {subtext}
            </Text>
          )}
        </VStack>
      </HStack>
    </Box>
  </Pressable>
)
