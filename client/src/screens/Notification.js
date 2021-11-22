import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Avatar } from 'native-base'
import { navigateGroupProductById } from '../features/product'
import ListItemBarColored from '../elements/ListItemBarColored'

export default () => {
  const navigation = useNavigation()

  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const notifications = user.notifications
  // console.log(notifications)

  const onPress = (item) => dispatch(navigateGroupProductById({ token, id: item.productId }))

  return notifications ? (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <ListItemBarColored
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
