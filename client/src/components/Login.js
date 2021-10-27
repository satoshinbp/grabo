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
    _id: '6172435c2b4fc5a8bcd3e349',
  }

  return (
    <Button onPress={() => dispatch(login(user))} w="100%">
      Login
    </Button>
  )
}
