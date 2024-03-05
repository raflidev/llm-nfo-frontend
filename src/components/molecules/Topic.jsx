import React from 'react'
import ButtonTopic from '../atoms/ButtonTopic'

export default function Topic(props) {
  const { children } = props
  return (
    <ButtonTopic>
      {children}
    </ButtonTopic>
  )
}
