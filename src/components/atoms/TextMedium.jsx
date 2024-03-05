import React from 'react'

export default function TextMedium(props) {
  const {children} = props
  return (
    <div className='font-medium'>
      {children}
    </div>
  )
}
