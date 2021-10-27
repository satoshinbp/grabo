import { Box, Heading } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'

export default () => {
  const { loading } = useSelector((state) => state.products)

  if (loading) return <Loading />
  return (
    <Box>
      <Heading>My Products</Heading>
      <ProductList />
    </Box>
  )
}
