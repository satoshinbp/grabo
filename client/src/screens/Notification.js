import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Center, Avatar, View, Heading, ScrollView } from 'native-base'
import ListItemBar from '../elements/ListItemBar'
import { readNotification } from '../features/auth'

export default () => {
  const navigation = useNavigation()

  const { token, user, notifications } = useSelector((state) => state.auth)
  const { groupedProducts } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const onPress = ({ _id: notificationId, message, productId }) => {
    dispatch(readNotification({ token, userId: user._id, notificationId }))

    // This is temporary solution to judge where to navigate
    // Better to restructure data model in future
    if (message.includes('Help')) {
      if (groupedProducts.map((product) => product._id).includes(productId)) {
        navigation.navigate('GroupsTab', { screen: 'GroupProduct', params: { id: productId } })
      } else {
        alert("Since you have left the group, you don't have access to this product.")
      }
    } else {
      navigation.navigate('MyProductsTab', { screen: 'MyProduct', params: { id: productId } })
    }
  }

  return notifications.length > 0 ? (
    <ScrollView>
      <View variant="wrapper">
        {notifications
          .map((notification, index) => (
            <ListItemBar
              key={index}
              text={notification.message}
              icon={
                <Avatar
                  source={{ uri: notification.userImage }}
                  size={10}
                  alt="user portrait"
                  position="relative"
                  alignSelf="center"
                  borderRadius="full"
                />
              }
              subIcon={
                <Avatar
                  source={{ uri: notification.productImage }}
                  size={10}
                  alt="user portrait"
                  position="relative"
                  alignSelf="center"
                />
              }
              onPress={() => onPress(notification)}
              textColor={notification.read ? 'muted.300' : 'black'}
            />
          ))
          .reverse()}
      </View>
    </ScrollView>
  ) : (
    <Center flex={1} bg="transparent" w="144px" h="144px" alignSelf="center">
      <Heading size="md">No notification</Heading>
    </Center>
  )
}
