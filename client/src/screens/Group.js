import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, Heading } from 'native-base'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import Container from '../elements/Container'
import { setProductsByGroup } from '../features/product'

export default ({ navigation }) => {
  const route = useRoute()
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.product)
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
      <Container>
        <View variant="wrapper" flex={0}>
          <Heading size="md" my={3}>
            {route.params.language} Group
          </Heading>
        </View>

        <ProductList />
      </Container>
    </View>
  )
}
