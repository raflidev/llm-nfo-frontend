import React from 'react'

export default function InputText(props) {
  const { text,setText, handleChange, loading, submitHandler } = props

  return (
    <input type="text" value={text} onChange={(e) => handleChange(e)} onKeyDown={(e) => e.key==='Enter'? submitHandler(e) : null } className={`w-full rounded-l-md p-2 px-4 duration-200 text-black  ${loading ? 'primary-bg' : 'bg-gray-50'}` } disabled={loading} placeholder={`${loading ? 'Loading...': 'Type a message'}`}/>
  )
}
