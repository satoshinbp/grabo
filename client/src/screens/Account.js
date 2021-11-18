import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, VStack, FormControl, Input, Button, Text, Avatar } from 'native-base'
import { updateUser } from '../features/auth'
import Loading from '../components/Loading'

export default () => {
  const { token, user, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [errors, setErrors] = useState({})

  const validate = () => {
    if (firstName.length < 3) {
      setErrors({
        ...errors,
        firstName: 'First name is too short',
      })
      return false
    }
    if (lastName.length < 3) {
      setErrors({
        ...errors,
        lastName: 'Last name is too short',
      })
      return false
    }
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email.match(emailformat)) {
      setErrors({
        ...errors,
        email: 'Email address is not valid',
      })
      return false
    }
    return true
  }

  const onSave = () => {
    if (validate()) {
      const params = {
        firstName,
        lastName,
        email,
      }
      dispatch(updateUser({ token, id: user._id, params }))
    }
  }

  if (loading) return <Loading />
  return (
    <View variant="wrapper">
      <VStack variant="container">
        <Avatar
          source={{ uri: user.image }}
          size="2xl"
          alt="user portrait"
          position="relative"
          alignSelf="center"
          borderRadius="full"
        />

        <FormControl>
          <FormControl.Label _text={{ bold: true }}>First name</FormControl.Label>
          <Input value={firstName} onChangeText={(value) => setFirstName(value)} />
          {'firstName' in errors && (
            <Text fontSize="xs" color="error.500" fontWeight={500}>
              {errors.firstName}
            </Text>
          )}
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ bold: true }}>Last name</FormControl.Label>
          <Input value={lastName} onChangeText={(value) => setLastName(value)} />
          {'lastName' in errors && (
            <Text fontSize="xs" color="error.500" fontWeight={500}>
              {errors.lastName}
            </Text>
          )}
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
          <Input value={email} onChangeText={(value) => setEmail(value)} />
          {'email' in errors && (
            <Text fontSize="xs" color="error.500" fontWeight={500}>
              {errors.email}
            </Text>
          )}
        </FormControl>

        <Button variant="primary" onPress={onSave}>
          Save
        </Button>
      </VStack>
    </View>
  )
}
