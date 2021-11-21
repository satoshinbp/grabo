import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Avatar } from 'native-base'

import ListItemBarColored from '../elements/ListItemBarColored'

export default () => {
  const { user } = useSelector((state) => state.auth)
  const notifications = user.notifications
  // console.log(notifications)
  const navigation = useNavigation()

  const onPress = (item) => navigation.navigate('GroupsTab', { screen: 'GroupProduct', params: { id: item.productId } })

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
