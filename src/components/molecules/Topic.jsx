import React from 'react'

export default function Topic(props) {
  const { children, isActive } = props
  return (
    <div className={`rounded py-2 px-4 flex justify-between hover:bg-gray-700 items-center cursor-pointer group ${isActive ? 'bg-gray-700' : ''}`}>
      {children}
    </div>
  )
}
