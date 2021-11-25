import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, Avatar, View } from 'native-base'
import { navigateGroupProductById } from '../features/product'
import ListItemBarColored from '../elements/ListItemBarColored'
import { readNotification } from '../features/auth'

export default () => {
  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const notifications = user.notifications
  // console.log(notifications)

  const onPress = (item) => {
    params = {
      id: user._id,
      notificationId: item._id,
    }
    dispatch(readNotification({ token, params }))
    dispatch(navigateGroupProductById({ token, id: item.productId }))
  }

  return notifications ? (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <ListItemBarColored
          props={item.read ? '#BBBCBD' : 'black'}
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
          onPress={() => onPress(item)}
        />
      )}
      showsVerticalScrollIndicator={false}
      flex={1}
    />
  ) : (
    <View flex={1} bg="transparent" style={{ width: 144, height: 144, alignSelf: 'center' }} />
  )
}
