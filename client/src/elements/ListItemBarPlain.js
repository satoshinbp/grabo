import React from 'react'
import { Box, Center, HStack, Pressable, Text, ChevronRightIcon } from 'native-base'

export default ({ text, icon, onPress }) => (
  <Pressable onPress={onPress}>
    <Box variant="listItemBarPlain">
      <HStack space={3} alignItems="center">
        <Center size={12} bg="primary.500" borderRadius="full">
          {icon}
        </Center>
        <Text fontSize="md" bold flex={1}>
          {text}
        </Text>
        <ChevronRightIcon size="5" mt="0.5" color="black" />
      </HStack>
    </Box>
  </Pressable>
)
