import React from 'react'
import { View, FlatList } from 'native-base'
import OnboardingItem from '../components/OnboardingItem'
import onboardingSlides from '../utils/onboardingSlides'

export default ({ setIsFirstLaunch }) => {
  return (
    <View flex={1}>
      <FlatList
        data={onboardingSlides}
        renderItem={({ item }) => <OnboardingItem item={item} setIsFirstLaunch={setIsFirstLaunch} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}
