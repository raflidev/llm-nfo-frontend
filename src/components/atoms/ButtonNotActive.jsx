import React from 'react'

export default function ButtonNotActive(props) {
  const {children} = props
  return (
    <div className='bg-blue-primary rounded-full inline px-2 font-normal ml-2 text-xs'>
      {children}
    </div>
  )
}
