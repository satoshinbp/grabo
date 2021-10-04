import React from 'react';
import { StatusBar, Box, HStack, Text } from 'native-base';

export default () => {
  return (
    <>
      <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#2c3e50">
        <HStack bg="#2c3e50" px={1} py={3} alignItems="center" justifyContent="center">
          <Text color="#fff" fontSize={20} fontWeight="bold">
            Grabo
          </Text>
        </HStack>
      </Box>
    </>
  );
};
