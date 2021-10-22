import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'native-base'
import { login } from '../features/user'

export default () => {
  const dispatch = useDispatch()
  const user = {
    googleId: '',
    name: 'John Doe',
    image: [],
    groups: ['ja', 'hi'],
  }

  return (
    <Button onPress={() => dispatch(login(user))} w="100%">
      Login
    </Button>
  )
}
