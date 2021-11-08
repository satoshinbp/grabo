import { Image, Pressable } from 'native-base'
import React from 'react'

const Report = (props) => {
  const onPressHandler = () => {
    props.modalHandler()
  }

  return (
    <>
      <Pressable onPress={() => onPressHandler()}>
        <Image source={require('../assets/exclamation.jpeg')} alt="image" style={{ width: 30, height: 30 }} />
      </Pressable>
    </>
  )
}

export default Report
