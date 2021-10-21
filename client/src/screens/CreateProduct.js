import React from 'react'
import { Box, Heading } from 'native-base'

export default (props) => {
  console.log('crate page' + props.route.params.code)
  console.log('crate page' + props.route.params.text)
  return (
    <Box>
      <Heading>Product Information</Heading>
    </Box>
  )
}
