import React from 'react'

function CQs(props) {
  const {item, setValue, index} = props
  // return

  const changeHandle = (e, indexCQ) => {
    item[indexCQ] = e.target.value
    
    setValue((prev) => {
      let newItems = [...prev]
      newItems[index] = item
      return newItems
    })
  }
  return (
    <div className='space-y-2'>
      {item.map((cq, indexCQ) => {
        return (
          <div key={indexCQ} className='flex space-x-3 items-center'>
            <textarea className='flex w-full bg-transparent' defaultValue={cq} onChange={(e) => changeHandle(e, indexCQ)} />
            <div className='flex space-x-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CQs