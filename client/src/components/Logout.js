import React from 'react'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { signOutWithGoogle } from '../actions/authActions'

// signOutWithGoogle is not working, WIP
const Logout = ({ signOutWithGoogle }) => (
  <Button onPress={signOutWithGoogle} w="100%">
    Logout
  </Button>
)

const mapDispatchToProps = (dispatch) => ({
  signOutWithGoogle: () => dispatch(signOutWithGoogle()),
})

export default connect(undefined, mapDispatchToProps)(Logout)
