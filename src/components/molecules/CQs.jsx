import React from 'react'
import ButtonSend from '../atoms/ButtonSend'

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

  const saveCQ = (cq, indexCQ) => {
    console.log('save', cq, indexCQ)
  }

  const deleteCQ = (cq, indexCQ) => {
    console.log('delete', cq, indexCQ)
    // delete item by indexCQ
    item.splice(indexCQ, 1)
    setValue((prev) => {
      let newItems = [...prev]
      newItems[index] = item
      return newItems
    })
  }

  const saveAllCQ = (item) => {
    const data = item.map((cq,index) => {
      return `${index+1}. ${cq}`
    })
    console.log('save all', {"competency_question": data})
  }

  return (
    <>
      <div className='space-y-2'>
        {item.map((cq, indexCQ) => {
          return (
            <div key={indexCQ} className='flex space-x-3 items-center'>
              <textarea className='flex w-full bg-transparent' defaultValue={cq} onChange={(e) => changeHandle(e, indexCQ)} />
              <div className='flex space-x-1'>
                <button className='hover:bg-blue-primary p-1 rounded duration-200' onClick={() => saveCQ(cq, indexCQ)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </button>
                <button className='hover:bg-red-500 p-1 rounded duration-200' onClick={() => deleteCQ(cq, indexCQ)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {/* button save */}
      <button className='py-2 px-3 bg-blue-primary rounded-lg text-sm' onClick={() => saveAllCQ(item)}>Save All</button>
    </>
  )
}

export default CQs