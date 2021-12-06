import React from 'react'
import { View } from 'native-base'
import ProductList from '../components/ProductList'
import Container from '../elements/Container'

export default () => (
  <View variant="wrapper">
    <Container>
      <ProductList />
    </Container>
  </View>
)
