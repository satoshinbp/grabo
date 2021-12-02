import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Center, Avatar, View, Heading, ScrollView } from 'native-base'
import { navigateGroupProductById } from '../features/product'
import ListItemBar from '../elements/ListItemBar'
import { readNotification } from '../features/auth'
import { fetchProductById } from '../api/product'
import { fetchUserById } from '../api/auth'
import Loading from '../components/Loading'

export default () => {
  const { token, user } = useSelector((state) => state.auth)
  const { notifications } = user
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [productImages, setProductImages] = useState([])
  const [userImages, setUserImages] = useState([])

  useEffect(() => {
    const getListedProducts = async () => {
      if (notifications.length === 0) return

      setLoading(true)

      const productPromises = notifications.map((notification) => fetchProductById(token, notification.productId))
      const fetchedProducts = await Promise.all(productPromises)
      const fetchedProductImages = fetchedProducts.map((product) => product.images[0].url)
      const userPromises = fetchedProducts.map((product) => fetchUserById(token, product.userId))
      const fetchedUser = await Promise.all(userPromises)
      const fetchedUserImages = fetchedUser.map((user) => user.image)

      setProductImages(fetchedProductImages)
      setUserImages(fetchedUserImages)

      setLoading(false)
    }
    getListedProducts()
  }, [notifications])

  const onPress = (item) => {
    dispatch(readNotification({ token, userId: user._id, notificationId: item._id }))
    dispatch(navigateGroupProductById({ token, id: item.productId }))
  }

  if (loading) return <Loading />
  return notifications.length > 0 ? (
    <ScrollView>
      <View variant="wrapper">
        {notifications.map((notification, index) => (
          <ListItemBar
            text={notification.message}
            icon={
              <Avatar
                source={{ uri: userImages[index] }}
                size={10}
                alt="user portrait"
                position="relative"
                alignSelf="center"
                borderRadius="full"
              />
            }
            subIcon={
              <Avatar
                source={{ uri: productImages[index] }}
                size={10}
                alt="user portrait"
                position="relative"
                alignSelf="center"
              />
            }
            onPress={() => onPress(notification)}
            textColor={notification.read ? 'muted.300' : 'black'}
          />
        ))}
      </View>
    </ScrollView>
  ) : (
    <Center flex={1} bg="transparent" w="144px" h="144px" alignSelf="center">
      <Heading size="md">No notification</Heading>
    </Center>
  )
}
