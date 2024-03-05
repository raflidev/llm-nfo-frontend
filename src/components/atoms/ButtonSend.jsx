import React from 'react'


export default function ButtonSend(props) {
  const { submitHandler, loading } = props

  return (
    <button type='submit' className={`rounded-r-md p-2 px-4 text-white ${loading ? 'bg-primary' : 'bg-blue-primary hover:bg-blue-900'}`} onClick={(e) => submitHandler(e)} disabled={loading}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </button>
  )
} 

