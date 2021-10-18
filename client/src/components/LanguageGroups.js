import React, { useState } from 'react'
import { Radio } from 'native-base'
import groups from '../utils/groups'

export default (props) => {
  const [value, setValue] = useState(props.code)

  return (
    <Radio.Group
      name="Group"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue)
      }}
    >
      {groups.map(
        (language) => (
          language.code == props.code && props.setIsTextDetected(true),
          (<Radio value={language.code}>{language.language}</Radio>)
        )
      )}
    </Radio.Group>
  )
}
