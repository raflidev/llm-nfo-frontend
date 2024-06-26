import React from 'react'
import IconLoading from './Icon/IconLoading'

function ButtonLoading(props) {
  const {onClick, type, children, isLoading} = props
  return (
    <button type={type} className='flex space-x-2 py-2 px-3 bg-blue-primary hover:bg-blue-900 rounded-lg text-sm duration-300' onClick={onClick}>
      <span>{children}</span>
      {
        isLoading ? 
        <IconLoading/>
        : ''
      }
    </button>
  )
}

export default ButtonLoading