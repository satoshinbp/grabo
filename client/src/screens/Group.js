import React from 'react'
import { useRoute } from '@react-navigation/core'
import { Box, Heading } from 'native-base'
import ProductList from '../components/ProductList'

export default () => {
  const route = useRoute()

  return (
    <Box>
      <Heading>{route.params.group}</Heading>
      <ProductList />
    </Box>
  )
}
