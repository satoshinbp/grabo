import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, SunIcon } from 'native-base'
import groups from '../utils/groups'
import ListItemBar from '../elements/ListItemBar'

export default () => {
  const { user } = useSelector((state) => state.auth)
  const navigation = useNavigation()

  const onPress = ({ language, code }) => navigation.navigate('Group', { language, code })

  return (
    <>
      {groups
        .filter((group) => user.groups.includes(group.code))
        .map((group) => (
          <ListItemBar text={group.language} code={group.code} borderLeftWidth="10px" onPress={() => onPress(group)} />
        ))}

      {/* add extra space to avoid contents to be hidden by FAB */}
      <View h="96px" />
    </>
  )
}
