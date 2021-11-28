import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { Box, Button, Divider, Flex, HStack, Pressable, Text, View } from 'native-base'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import { setProductsByGroup, sortGroupedProductsByDate, sortGroupedProductsByHighlight } from '../features/product'
import { switchSortCategory } from '../features/ProductSortCategory'

export default ({ navigation }) => {
  const route = useRoute()
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.product)
  //const [isProductByDate, setIsProductByDate] = useState(true)
  const { categoryIsDate } = useSelector((state) => state.sortCategory)
  const { groupedProducts } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setProductsByGroup({ token, code: route.params.code }))
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (categoryIsDate === true) {
      dispatch(sortGroupedProductsByDate())
    } else {
      dispatch(sortGroupedProductsByHighlight())
    }
  }, [categoryIsDate, groupedProducts])

  if (loading) return <Loading />
  return (
    <View variant="wrapper">
      <Text>{categoryIsDate ? 'Date' : 'highlight'}</Text>
      <>
        <Text fontSize="lg" bold my="3">
          {route.params.language} Group
        </Text>
        <Flex direction="row" alignItems="center" justify="center" width="100%">
          <Box variant={categoryIsDate ? 'sortProductToggleOn' : 'sortProductToggleOff'}>
            <Pressable
              py="4"
              onPress={() => {
                dispatch(switchSortCategory(true))
                console.log(categoryIsDate)
              }}
            >
              <Text alignItems="center" fontWeight={categoryIsDate ? 'bold' : 'normal'}>
                Products by Date
              </Text>
            </Pressable>
          </Box>
          <Box variant={!categoryIsDate ? 'sortProductToggleOn' : 'sortProductToggleOff'}>
            <Pressable
              py="4"
              onPress={() => {
                dispatch(switchSortCategory(false))
                console.log(categoryIsDate)
              }}
            >
              <Text fontWeight={categoryIsDate ? 'normal' : 'bold'}>Products by Highlights</Text>
            </Pressable>
          </Box>
        </Flex>
      </>
      <ProductList />
    </View>
  )
}
