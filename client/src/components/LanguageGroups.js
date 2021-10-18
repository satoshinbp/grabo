import React, { useState } from 'react'
import { Radio } from 'native-base'
import groups from '../utils/groups'

export default () => {
  const [value, setValue] = useState('')

  return (
    <Radio.Group
      name="Group"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue)
      }}
    >
      {groups.map((language) => (
        <Radio value={language.code}>{language.language}</Radio>
      ))}
    </Radio.Group>
  )
}
