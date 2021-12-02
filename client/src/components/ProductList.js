import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ImageBackground } from 'react-native'
import { View, Box, Center, HStack, FlatList, Pressable, Text } from 'native-base'
import { sortProductsByDate, sortProductsByHighlight } from '../features/product'

export default () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { groupedProducts, postedProducts, savedProducts } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const [sortedBy, setSortedBy] = useState('date')

  useEffect(() => {
    if (sortedBy === 'date') {
      dispatch(sortProductsByDate(route.name))
    } else {
      dispatch(sortProductsByHighlight(route.name))
    }
  }, [sortedBy])

  const gridLayoutFormat = (data, numColumns) => {
    const tempData = data.concat()
    const numberOfFullRows = Math.floor(tempData.length / numColumns)

    let numberOfElementsLastRow = tempData.length - numberOfFullRows * numColumns
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      tempData.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
      numberOfElementsLastRow = numberOfElementsLastRow + 1
    }

    console.log(tempData)
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

  // e.g. 2021-11-28T21:49:02.330+00:00 => 12 days ago
  const convertTimestampToDurationFromToday = (product) => {
    const currentTime = new Date()
    const productTimestamp = new Date(product.createdAt)
    return Math.floor((currentTime - productTimestamp) / 1000 / 60 / 60 / 24)
  }

  const countComments = (product) => {
    let commentLengthSum = 0
    product.fixedQandAs.forEach((question) => {
      commentLengthSum += question.answers.length
    })
    product.uniqQandAs.forEach((question) => {
      commentLengthSum += question.answers.length
    })
    return commentLengthSum
  }

  const ProductCard = ({ item }) => {
    const elapsedTimeBetweenNowAndPostedDate = convertTimestampToDurationFromToday(item)

    return !item.empty && item.images.length > 0 ? (
      <Pressable flex={1} my={3} onPress={() => navigation.navigate(productRoute, { id: item._id })}>
        <ImageBackground
          source={{ uri: item.images[Math.floor(Math.random() * item.images.length)].url }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 12 }}
          style={{ width: '100%', height: 144, alignSelf: 'center' }}
        >
          <Box variant="productCard">
            <Text>
              {elapsedTimeBetweenNowAndPostedDate}&nbsp;
              {elapsedTimeBetweenNowAndPostedDate > 1 ? 'days' : 'day'}&nbsp;ago
            </Text>
            <Text>
              {countComments(item)}&nbsp;
              {countComments(item) > 1 ? 'comments' : 'comment'}
            </Text>
          </Box>
        </ImageBackground>
      </Pressable>
    ) : (
      <View flex={1} bg="transparent" w="144px" h="144px" alignSelf="center" />
    )
  }

  const numColumns = 2

  return (
    <>
      {products.length > 0 ? (
        <>
          <HStack>
            <Pressable
              variant={sortedBy === 'date' ? 'activeTab' : 'inactiveTab'}
              py="4"
              onPress={() => setSortedBy('date')}
            >
              <Text alignItems="center" fontWeight={sortedBy === 'date' ? 'bold' : 'normal'}>
                Sort by Date
              </Text>
            </Pressable>
            <Pressable
              variant={sortedBy === 'highlight' ? 'activeTab' : 'inactiveTab'}
              py="4"
              onPress={() => setSortedBy('highlight')}
            >
              <Text fontWeight={sortedBy === 'highlight' ? 'bold' : 'normal'}>Sort by Highlights</Text>
            </Pressable>
          </HStack>

          <FlatList
            data={gridLayoutFormat(products, numColumns)}
            renderItem={ProductCard}
            numColumns={numColumns}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <Center flex={1}>
          <Text fontSize="lg" textAlign="center" mt={12}>
            No products added
          </Text>
        </Center>
      )}
    </>
  )
}
