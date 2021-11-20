import { Image, Pressable } from 'native-base'
import React from 'react'

const Report = (props) => {
  const onPressHandler = () => {
    props.modalHandler()
  }

  return (
    <>
      <Pressable onPress={() => onPressHandler()}>
        <Image
          source={require('../assets/icons/exclamation.jpeg')}
          alt="image"
          width="18px"
          height="18px"
          padding={2}
        />
      </Pressable>
    </>
  )
}

export default Report
