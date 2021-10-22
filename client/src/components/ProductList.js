import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Button, FlatList, Image } from 'native-base'

export default () => {
  const navigation = useNavigation()
  const products = useSelector((state) => state.products.data)

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Button onPress={() => navigation.navigate('Product', { id: item._id })}>
          {/* <Image
            source={{
              uri: item.images[Math.floor(Math.random() * item.images.length)].url,
            }}
            alt="product"
            size="xl"
          /> */}
          {/* to be replaced with Image */}
          {item.keywords[0]}
        </Button>
      )}
      keyExtractor={(item) => item._id}
    />
  )
}
