import React, { useState } from 'react'
import GridTopic from '../organisms/GridTopic'

export default function LayoutPage(props) {
  const { children } = props
  return (
    <div className='bg-primary-bg min-h-screen text-white font-inter'>
    <div className='flex space-x-0 md:space-x-10 justify-center'>
      <div className="hidden md:block w-2/12 bg-secondary-bg min-h-screen">
          <GridTopic/>
      </div>
      <div className="w-11/12 md:w-10/12">
      <div className='flex justify-center md:h-[75vh] xl:h-[90vh] overflow-y-auto'>
        <div className='w-full md:w-11/12 lg:w-8/12 px-2 md:px-10'>
            <div className='font-bold py-7 text-xl flex justify-between'>
              <span className='uppercase'>LLM-NFO</span>
            </div>
              {children}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
