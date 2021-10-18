import React from 'react'
import { Button } from 'native-base'
import { useDispatch } from 'react-redux'
import { login } from '../features/user'

export default () => {
  const dispatch = useDispatch()
  const user = {
    googleId: '',
    name: 'John Doe',
    image: [],
    groups: ['jp', 'hi'],
  }

  return (
    <Button onPress={() => dispatch(login(user))} w="100%">
      Login
    </Button>
  )
}
