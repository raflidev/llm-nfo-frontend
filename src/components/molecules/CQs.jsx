import { useMutation } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { saveCQFromConversationID } from '../../services/cq.services'
import { useParams } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'
import ButtonLoading from '../atoms/ButtonLoading'
import DataChatContext from '../context/DataChatContext'

function CQs(props) {
  const {setStep} = useContext(DataChatContext)
  const {id} = useParams()
  const {item, setValue, index} = props
  const [cq, setCQ] = useState(item)
  const [confirmation, setConfirmation] = useState(false)
  const [saveItem, setSaveItem] = useState(
    cq.map((item) => {
      return false
    })
  )

  const {mutate: saveCQs, isPending: isPendingSaveCQs} = useMutation({mutationFn: saveCQFromConversationID,
    onSuccess: (response) => {
      console.log(response)
      if(response.status === 200){
        toast.success(response.message, {
          transition: Slide
        })
        setStep(3)
      }
    }
  })

  const changeHandle = (e, indexCQ) => {
    setCQ((prev) => {
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
    setCQ((prev) => {
      let newItems = [...prev]
      newItems.splice(indexCQ, 1)
      return newItems
    })
  }

  const saveAllCQ = (item) => {
    const data = {
      "id": id,
      "competency_question": cq
    }
    saveCQs(data)
  }

  const resetAllCQ = () => {
    window.location.reload()
  }

  return (
    <>
      <div className='space-y-2'>
        {cq.map((cqItem, indexCQ) => {
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
      {
        !confirmation ? 
        <div className='space-x-2 flex justify-end pt-5'>
          <button className='py-2 px-3 hover:underline rounded-lg text-sm duration-300' onClick={() => resetAllCQ()}>Reset</button>
          <button className='py-2 px-3 bg-blue-primary hover:bg-blue-900 rounded-lg text-sm duration-300' onClick={() => {setConfirmation(!confirmation);setSaveItem(item.map((item) => {return true}))}}>Save All</button>
        </div>
        :
        <div className='space-x-2 flex justify-end pt-5'>
          <button className='py-2 px-3 hover:underline rounded-lg text-sm duration-300' onClick={() => setConfirmation(!confirmation)}>Cancel</button>
          <ButtonLoading onClick={() => saveAllCQ(cq)} isLoading={isPendingSaveCQs} type='button'>Are you sure?</ButtonLoading>
        </div>
        
      }
    </>
  )
}

export default CQs