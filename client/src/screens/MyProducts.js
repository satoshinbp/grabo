import React from 'react'
import { useSelector } from 'react-redux'
import { View } from 'native-base'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'
import Container from '../elements/Container'

export default () => (
  <View variant="wrapper">
    <Container>
      <ProductList />
    </Container>
  </View>
)
