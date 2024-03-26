import React from 'react'
import GridTopic from '../organisms/GridTopic'

export default function LayoutPage(props) {
  const { children } = props
  return (
    <div className='bg-primary-bg min-h-screen text-white font-inter'>
    <div className='flex space-x-10 justify-center'>
      <div className="w-2/12 bg-secondary-bg min-h-screen">
          <GridTopic/>
      </div>
      <div className="w-11/12 md:w-10/12">
          {children}
      </div>
    </div>
  </div>
  )
}
