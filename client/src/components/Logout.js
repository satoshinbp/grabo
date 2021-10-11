// Authentication to be completed after Jason's JWT class!import React from 'react'

import { Button } from 'native-base'
import { useDispatch } from 'react-redux'
import { startLogout } from '../actions/userActions'

export default () => {
  const dispatch = useDispatch()

  return (
    <Button onPress={() => dispatch(startLogout())} w="100%">
      Logout
    </Button>
  )
}
