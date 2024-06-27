import React from 'react'

export default function InputText(props) {
  const { text,setText } = props
  return (
    <input type="text" value={text} onChange={(e) => setText(e.target.value) } className={`w-full px-2 py-1 block rounded-md border border-black overflow-hidden duration-200 text-black` }/>
  )
}
