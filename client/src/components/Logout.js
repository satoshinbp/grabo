import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'native-base'
import { logout } from '../features/user'

export default () => {
  const dispatch = useDispatch()

  return (
    <Button onPress={() => dispatch(logout())} w="100%">
      Logout
    </Button>
  )
}
