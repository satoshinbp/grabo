import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Heading } from 'native-base'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'

export default () => {
  const { loading } = useSelector((state) => state.product)
  if (loading) return <Loading />

  return (
    <Box>
      <Heading>Favs</Heading>
      <ProductList />
    </Box>
  )
}
