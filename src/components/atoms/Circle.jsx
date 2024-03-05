import React from 'react'

export default function Circle(props) {
  const { color } = props
  return (
    <div className={'rounded-full w-7 h-7 ' + color}></div>
  )
}
