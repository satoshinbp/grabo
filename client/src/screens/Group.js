import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { Box, Button, Divider, Flex, HStack, Pressable, Text, View } from 'native-base'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import { setProductsByGroup } from '../features/product'

export default ({ navigation }) => {
  const route = useRoute()
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.product)
  const [isProductByDate, setIsProductByDate] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setProductsByGroup({ token, code: route.params.code }))
    })

    return unsubscribe
  }, [navigation])
  if (loading) return <Loading />
  return (
    <View variant="wrapper">
      <>
        <Text fontSize="lg" bold my="3">
          {route.params.language} Group
        </Text>
        <Flex direction="row" alignItems="center" justify="center" width="100%">
          <Box variant={isProductByDate ? 'sortProductToggleOn' : 'sortProductToggleOff'}>
            <Pressable
              py="4"
              onPress={() => {
                setIsProductByDate(true)
              }}
            >
              <Text alignItems="center" fontWeight={isProductByDate ? 'bold' : 'normal'}>
                Products by Date
              </Text>
            </Pressable>
          </Box>
          <Box variant={!isProductByDate ? 'sortProductToggleOn' : 'sortProductToggleOff'}>
            <Pressable
              py="4"
              onPress={() => {
                setIsProductByDate(false)
              }}
            >
              <Text fontWeight={isProductByDate ? 'normal' : 'bold'}>Products by Highlights</Text>
            </Pressable>
          </Box>
        </Flex>
      </>
      <ProductList />
    </View>
  )
}
