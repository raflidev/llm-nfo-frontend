import React from 'react'

export default function ButtonTopic(props) {
  const { children } = props
  return (
    <div>
      <div className='rounded py-2 px-4 flex justify-between hover:bg-gray-700 items-center cursor-pointer group'>
        {children}
      </div>
    </div>
  )
}
