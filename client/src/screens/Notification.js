import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, Avatar, View, Heading } from 'native-base'
import { navigateGroupProductById } from '../features/product'
import ListItemBarColored from '../elements/ListItemBarColored'
import { readNotification } from '../features/auth'
import { fetchProductById } from '../api/product'

export default () => {
  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [urls, setUrls] = useState('')

  const notifications = user.notifications

  const productIds = notifications.map((notification) => notification.productId)

  const getListedProducts = async () => {
    const products = productIds.map((productId) => fetchProductById(token, productId))
    if (products.length > 0) {
      const results = await Promise.all(products)
      const imageUrls = results.map((result) => result.images[0].url)
      setUrls(imageUrls)
    }
  }
  getListedProducts()

  const onPress = (item) => {
    params = {
      id: user._id,
      notificationId: item._id,
    }
    dispatch(readNotification({ token, params }))
    dispatch(navigateGroupProductById({ token, id: item.productId }))
  }

  return notifications && urls ? (
    <FlatList
      data={notifications}
      renderItem={({ item, index }) => (
        <ListItemBarColored
          textColor={item.read ? '#BBBCBD' : 'black'}
          text={item.message}
          icon={
            <Avatar
              source={{ uri: user?.image }}
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
    <View flex={1} bg="transparent" style={{ width: 144, height: 144, alignSelf: 'center' }}>
      <Heading size="md">No notification</Heading>
    </View>
  )
}
