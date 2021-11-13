import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FlatList, SunIcon } from 'native-base'
import groups from '../utils/groups'
import ListItemBarColored from '../elements/ListItemBarColored'

export default () => {
  const { user } = useSelector((state) => state.auth)
  const navigation = useNavigation()

  const onPress = () => navigation.navigate('Group', { language: item.language, code: item.code })

  return (
    <FlatList
      data={groups.filter((group) => user?.groups?.includes(group.code))}
      renderItem={({ item }) => (
        <ListItemBarColored text={item.language} icon={<SunIcon size={8} />} onPress={onPress} />
      )}
      keyExtractor={(item) => item.code}
      showsVerticalScrollIndicator={false}
      flex={1}
    />
  )
}
