import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Button } from 'native-base'

export default () => {
  const navigation = useNavigation()
  const products = useSelector((state) => state.products.value)

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Button
          onPress={() =>
            navigation.navigate('Product', { product: item.keywords.length > 0 ? item.keywords[0] : 'No Keywords' })
          }
        >
          {item.keywords.length > 0 ? item.keywords[0] : 'No Keywords'}
        </Button>
      )}
      keyExtractor={(item) => item._id}
    />
  )
}
