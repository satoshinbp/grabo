import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { Box, Heading } from 'native-base'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import { fetchProductsByGroup } from '../features/product'

export default ({ navigation }) => {
  const route = useRoute()
  const { loading } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchProductsByGroup(route.params.code))
    })

    return unsubscribe
  }, [navigation])

  if (loading) return <Loading />
  return (
    <Box>
      <Heading>{route.params.group}</Heading>
      <ProductList />
    </Box>
  )
}
