import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getImportantTempByConvID } from '../../services/importantTemp.services'
import { useMutation, useQuery } from '@tanstack/react-query'
import IconPlus from '../atoms/Icon/IconPlus'
import ButtonLoading from '../atoms/ButtonLoading'

function ImportantTerm() {
  const {id} = useParams()
  const {data: importantTerm, isPending: isPendingImportantTerm} = useQuery({queryKey: ['important_term', id], queryFn: () => getImportantTempByConvID(id)})
  
  const [termItem, setTermItem] = useState([])
  const [confirmation, setConfirmation] = useState(false)
  const [saveItem, setSaveItem] = useState(
    termItem?.map((item) => {
      return false
    })
  )

  useEffect(() => {
    if(importantTerm){
        const Term = importantTerm?.data.data[importantTerm?.data.data.length - 1]
        setTermItem(Term?.terms.slice(1, -1).split(","))
    }
  },[importantTerm])
//   return

//   const {mutate: saveCQs, isPending: isPendingSaveCQs} = useMutation({mutationFn: saveCQFromConversationID,
//     onSuccess: (response) => {
//       console.log(response)
//       if(response.status === 200){
//         toast.success(response.message, {
//           transition: Slide
//         })
//         setTermItemContext(cq)
//         setStep(3)
//       }
//     }
//   })

  const changeHandle = (e, indexCQ) => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ] = e.target.value
      return newItems
    })
  }

  const saveCQ = (cq, indexCQ) => {
    // save item by indexCQ
    setSaveItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ] = true
      return newItems
    })
  }

  const deleteCQ = (cq, indexCQ) => {
    // delete item by indexCQ
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems.splice(indexCQ, 1)
      return newItems
    })
  }

  const saveAllItem = (item) => {
    const data = {
      "id": id,
      "competency_question": termItem
    }

    console.log(termItem,saveItem);
    // saveCQs(data)
  }

  const resetAllCQ = () => {
    window.location.reload()
  }

  const addItemHandler = () => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems.push('')
      return newItems
    })
    setSaveItem((prev) => {
      let newItems = [...prev]
      newItems.push(false)
      return newItems
    })
  }

  return (
    <>
      <div className='space-y-2'>
        {termItem.map((cqItem, indexCQ) => {
          return (
            <div key={indexCQ} className='flex space-x-3 items-center'>
              {!saveItem[indexCQ] ?
              <textarea className='flex w-full bg-transparent border border-white p-1 rounded mt-4' defaultValue={cqItem} onChange={(e) => changeHandle(e, indexCQ)} />
              :
              <textarea className='flex w-full bg-transparent border border-white p-1 rounded mt-4' defaultValue={cqItem} disabled />
              }
                {!saveItem[indexCQ] ? 
                  <div className='flex space-x-1'>
                    <button className='hover:bg-blue-primary p-1 rounded duration-200' onClick={() => saveCQ(cqItem, indexCQ)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </button>
                    <button className='hover:bg-red-500 p-1 rounded duration-200' onClick={() => deleteCQ(cqItem, indexCQ)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  :
                  <div className='bg-green-800  p-1 rounded duration-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                }
            </div>
          )
        })}
      </div>
      <div className='pt-3'>
        <button onClick={() => addItemHandler()} className='py-1 px-3 bg-green-600 hover:bg-green-900 rounded-lg text-sm duration-300 flex space-x-1 item-center'>
          <IconPlus/>
          <span>Add Item</span>
        </button>
      </div>
      {
        !confirmation ? 
        <div className='space-x-2 flex justify-end pt-5'>
          <button className='py-2 px-3 hover:underline rounded-lg text-sm duration-300' onClick={() => resetAllCQ()}>Reset</button>
          <button className='py-2 px-3 bg-blue-primary hover:bg-blue-900 rounded-lg text-sm duration-300' onClick={() => {setConfirmation(!confirmation);setSaveItem(termItem.map((cq) => {return true}))}}>Save All</button>
        </div>
        :
        <div className='space-x-2 flex justify-end pt-5'>
          <button className='py-2 px-3 hover:underline rounded-lg text-sm duration-300' onClick={() => setConfirmation(!confirmation)}>Cancel</button>
          {/* <ButtonLoading onClick={() => saveAllItem(termItem)} isLoading={isPendingSaveCQs} type='button'>Are you sure?</ButtonLoading> */}
          <ButtonLoading onClick={() => saveAllItem(termItem)} type='button'>Are you sure?</ButtonLoading>
        </div>
        
      }
    </>
  )
}

export default ImportantTerm