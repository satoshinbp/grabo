import React from 'react'
import { useSelector } from 'react-redux'
import { View } from 'native-base'
import Loading from '../components/Loading'
import ProductList from '../components/ProductList'

export default () => {
  const { loading } = useSelector((state) => state.product)
  if (loading) return <Loading />

  return (
    <View variant="wrapper">
      <ProductList />
    </View>
  )
}
