import React from 'react'
import favicon from '../assets/favicon'

const Report = () => {
  const hoge = () => {
    console.log('hogehoge')
  }

  return (
    <div>
      <img src={favicon} alt="Report Icon" onClick={hoge} />
    </div>
  )
}

export default Report
