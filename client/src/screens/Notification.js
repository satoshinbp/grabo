import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, Avatar, View, Heading, AlertDialog } from 'native-base'
import { navigateGroupProductById } from '../features/product'
import ListItemBarColored from '../elements/ListItemBarColored'
import { readNotification } from '../features/auth'
import { fetchProductById } from '../api/product'
import { fetchUserByUserId } from '../api/auth'
import Loading from '../components/Loading'

export default () => {
  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [urls, setUrls] = useState('')
  const [userIds, setUserIds] = useState('')
  const [profileImages, setProfileImages] = useState()

  const notifications = user.notifications

  const productIds = notifications.map((notification) => notification.productId)

  useEffect(() => {
    const getListedProducts = async () => {
      setLoading(true)
      const products = productIds.map((productId) => fetchProductById(token, productId))
      if (products.length > 0) {
        const results = await Promise.all(products)
        // console.log(results)
        const imageUrls = results.map((result) => result.images[0].url)
        const ids = results.map((result) => result.userId)
        setUserIds(ids)
        setUrls(imageUrls)
      }
      setLoading(false)
    }
    getListedProducts()
  }, [notifications])

  //get user's profile images

  if (userIds.length > 0) {
    const getUsersImages = async () => {
      const users = userIds.map((userId) => fetchUserByUserId(token, userId))
      const fetchedUsers = await Promise.all(users)
      const images = fetchedUsers.map((user) => user.image)
      setProfileImages(images)
    }
    getUsersImages()
  }

  const onPress = (item) => {
    params = {
      userId: user._id,
      notificationId: item._id,
    }
    dispatch(readNotification({ token, params }))
    dispatch(navigateGroupProductById({ token, id: item.productId }))
  }
  if (loading) return <Loading />
  return notifications && profileImages ? (
    <FlatList
      data={notifications}
      renderItem={({ item, index }) => (
        <ListItemBarColored
          textColor={item.read ? '#BBBCBD' : 'black'}
          text={item.message}
          icon={
            <Avatar
              source={{ uri: profileImages[index] }}
              size={8}
              alt="user portrait"
              position="relative"
              alignSelf="center"
              borderRadius="full"
            />
          }
          productIcon={
            <Avatar source={{ uri: urls[index] }} size={8} alt="user portrait" position="relative" alignSelf="center" />
          }
          onPress={() => onPress(item)}
        />
      )}
      showsVerticalScrollIndicator={false}
      flex={1}
    />
  ) : (
    <View flex={1} bg="transparent" w="144px" h="144px" alignSelf="center">
      <Heading size="md">No notification</Heading>
    </View>
  )
}
