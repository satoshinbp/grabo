import React from 'react'
import { Button } from 'native-base'
import { useDispatch } from 'react-redux'
import { logout } from '../features/user'

export default () => {
  const dispatch = useDispatch()

  return (
    <Button onPress={() => dispatch(logout())} w="100%">
      Logout
    </Button>
  )
}
