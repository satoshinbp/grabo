import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ImageBackground } from 'react-native'
import { View, Box, Pressable, FlatList, Text } from 'native-base'
import { _ } from 'lodash'

export default () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { groupedProducts, postedProducts, savedProducts } = useSelector((state) => state.product)
  const { categoryIsDate } = useSelector((state) => state.sortCategory) // sort by "date" or "highlight"
  const [sortedGroupedProducts, setSortedGroupedProducts] = useState([])

  useEffect(() => {
    const sortProductsByCategory = () => {
      // sort by date
      const copiedGroupedProducts = _.cloneDeep(groupedProducts)
      if (copiedGroupedProducts.length > 0) {
        copiedGroupedProducts.sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt)
        })
      }
    }

    console.log(sortProductsByCategory())
  }, [categoryIsDate])

  const gridLayoutFormat = (data, numColumns) => {
    const tempData = data.concat()
    const numberOfFullRows = Math.floor(tempData.length / numColumns)

    let numberOfElementsLastRow = tempData.length - numberOfFullRows * numColumns
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      tempData.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
      numberOfElementsLastRow = numberOfElementsLastRow + 1
    }

    return tempData
  }

  let products
  let productRoute
  switch (route.name) {
    case 'Group':
      products = groupedProducts
      productRoute = 'GroupProduct'
      break
    case 'MyProducts':
      products = postedProducts
      productRoute = 'MyProduct'
      break
    case 'Favorites':
      products = savedProducts
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
          imageStyle={{ borderRadius: 12 }}
          style={{ width: 144, height: 144, alignSelf: 'center' }}
        >
          <Box variant="productCard" />
        </ImageBackground>
      </Pressable>
    ) : (
      <View flex={1} bg="transparent" w="144px" h="144px" alignSelf="center" />
    )

  const numColumns = 2

  return (
    <>
      <Text>{sortedGroupedProducts.length}</Text>
      <Text>{products.length === 0 && 'No products added'}</Text>
      <FlatList
        data={gridLayoutFormat(products, numColumns)}
        renderItem={ProductCard}
        numColumns={numColumns}
        keyExtractor={(item) => item._id}
      />
    </>
  )
}
