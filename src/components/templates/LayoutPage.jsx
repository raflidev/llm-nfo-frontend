import React, { useState } from 'react'
import GridTopic from '../organisms/GridTopic'
import IconMenu from '../atoms/Icon/IconMenu'

export default function LayoutPage(props) {
  const { children } = props
  const [toggle, setToggle] = useState(false)

  return (
    <div className='bg-primary-bg min-h-screen text-white font-inter relative'>
    <div className='flex space-x-0 md:space-x-10 justify-center'>
      <div className="hidden md:block w-2/12 bg-secondary-bg min-h-screen">
          <GridTopic setToggleMenu={setToggle} toggleMenu={toggle}/>
      </div>
      <div className="w-11/12 md:w-10/12">
      <div className='flex justify-center md:h-[75vh] xl:h-[90vh] overflow-y-auto'>
        <div className='w-full md:w-11/12 lg:w-8/12 px-2 md:px-10'>
          <div className={`${toggle ? 'fixed' : 'hidden' } md:hidden left-0 w-10/12 bg-secondary-bg min-h-screen`}>
              <GridTopic setToggleMenu={setToggle} toggleMenu={toggle}/>
          </div>
            <div className='font-bold py-7 text-xl flex items-center space-x-2 md:space-x-2'>
              <div className='block md:hidden p-1 rounded-full cursor-pointer hover:bg-gray-500' onClick={() => setToggle(!toggle)}>
                <IconMenu/>
              </div>
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
