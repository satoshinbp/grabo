import { Image, View } from 'native-base'
import React from 'react'

const Report = () => {
  const hoge = () => {
    console.log('hogehoge')
  }

  return <Image source={require('../assets/exclamation.jpeg')} alt="image" style={{ width: 30, height: 30 }} />
}

export default Report
