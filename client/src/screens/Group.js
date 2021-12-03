import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, Heading } from 'native-base'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import Container from '../elements/Container'

export default () => {
  const route = useRoute()

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
