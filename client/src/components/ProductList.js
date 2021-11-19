import React from 'react'
import { useSelector } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ImageBackground } from 'react-native'
import { View, Box, Pressable, FlatList } from 'native-base'

export default () => {
  const route = useRoute()
  const navigation = useNavigation()

  console.log(route.name)

  const { products } = useSelector((state) => state.product)

  const format = (data, numColumns) => {
    const tempData = data.concat()
    const numberOfFullRows = Math.floor(tempData.length / numColumns)

    let numberOfElementsLastRow = tempData.length - numberOfFullRows * numColumns
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      tempData.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
      numberOfElementsLastRow = numberOfElementsLastRow + 1
    }

    return tempData
  }

  let productRoute
  switch (route.name) {
    case 'Group':
      productRoute = 'GroupProduct'
      break
    case 'MyProducts':
      productRoute = 'MyProduct'
      break
    case 'Favorites':
      productRoute = 'Favorite'
      break
    default:
      break
  }

  const ProductCard = ({ item }) =>
    !item.empty && item.images.length > 0 ? (
      <Pressable flex={1} my={3} onPress={() => navigation.navigate(productRoute, { id: item._id })}>
        <ImageBackground
          source={{ uri: item.images[Math.floor(Math.random() * item.images.length)].url }}
          resizeMode="cover"
          style={{ width: 144, height: 144, alignSelf: 'center', borderRadius: 32 }}
        >
          <Box variant="productCard"></Box>
        </ImageBackground>
      </Pressable>
    ) : (
      <View flex={1} bg="transparent" style={{ width: 144, height: 144, alignSelf: 'center' }} />
    )

  const numColumns = 2

  return (
    <FlatList
      data={format(products, numColumns)}
      renderItem={ProductCard}
      numColumns={numColumns}
      keyExtractor={(item) => item._id}
    />
  )
}
