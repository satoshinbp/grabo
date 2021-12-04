import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, View, Button, Heading } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import GroupList from '../components/GroupList'

export default () => {
  const navigation = useNavigation()

  return (
    <>
      <ScrollView>
        <View variant="wrapper">
          <Heading size="md" my={3}>
            List of languages that you speak
          </Heading>
          <GroupList />
        </View>
      </ScrollView>

      <Button variant="fab" onPress={() => navigation.navigate('GroupsSetting')}>
        <MaterialIcons name="edit" size={24} color="black" />
      </Button>
    </>
  )
}
