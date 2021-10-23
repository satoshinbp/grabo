import { Box, Heading } from 'native-base'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import { fetchProductsByUserId } from '../features/products'

export default () => {
  const route = useRoute()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.products)
  //const { mongoId } = useSelector((state) => state.mongoId)

  useEffect(() => {
    console.log('running')
    dispatch(fetchProductsByUserId('6172435c2b4fc5a8bcd3e349'))
  }, [])

  if (loading) return <Loading />
  return (
    <Box>
      <Heading>My Products</Heading>
      <ProductList />
    </Box>
  )
}
