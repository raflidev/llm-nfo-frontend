import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getImportantTempByConvID, postSaveImportantTempByConvID } from '../../services/importantTemp.services'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import IconPlus from '../atoms/Icon/IconPlus'
import ButtonLoading from '../atoms/ButtonLoading'
import UploadPopUp from './UploadPopUp'
import { Slide, toast } from 'react-toastify'
import DataChatContext from '../context/DataChatContext'
import { deleteClasses } from '../../services/classes.services'

function ValidationData(props) {
  const {data, saveFunction, setItem, isLoading} = props
  const {id} = useParams()
  
  const {setStep} = useContext(DataChatContext)
  const queryClient = new QueryClient()
  
  const [termItem, setTermItem] = useState(data)
  const [confirmation, setConfirmation] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [dataUpload, setDataUpload] = useState([])
  const [itemDelete, setItemDelete] = useState([])
  const [dataName, setDataName] = useState('')
  const [saveItem, setSaveItem] = useState(
    termItem?.map((item) => {
      return false
    })
  )


  const {mutate: deleteItem, isPending: isPendingDeleteItem} = useMutation({mutationFn: deleteClasses,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['classes', id]})
      }
    }
  })

  const changeHandle = (e, indexCQ) => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][0] = e.target.value
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

    // setItemdelete
    setItemDelete((prev) => {
      let newItems = [...prev]
      newItems.push(cq[1])
      return newItems
    })
  }

  const saveAllItem = () => {
    const data = {
      "item": termItem
    }
    
    const dataDelete = {
      "class_ids": itemDelete
    }

    setItem(data)
    deleteItem(dataDelete)
    // saveFunction(data)
  }

  const resetAllCQ = () => {
    window.location.reload()
  }

  const addItemHandler = () => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems.push(['', ''])
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
      {
        toggle ? <UploadPopUp toggle={toggle} setToggle={setToggle} data={dataUpload} setData={setDataUpload} setDataName={setDataName} /> : ''
      }
      {
        termItem.length > 0 ?
        <>
          <div className='space-y-2'>
            {termItem.map((cqItem, indexCQ) => {
              return (
                <div key={indexCQ} className='flex space-x-3 items-center'>
                  {!saveItem[indexCQ] ?
                  <textarea className='flex w-full bg-transparent border border-white p-1 rounded mt-4' value={cqItem[0]} onChange={(e) => changeHandle(e, indexCQ)} />
                  :
                  <textarea className='flex w-full bg-transparent border border-white p-1 rounded mt-4' value={cqItem[0]} disabled />
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
              <ButtonLoading isLoading={isLoading} onClick={() => saveAllItem(termItem)} type='button'>Are you sure?</ButtonLoading>
            </div>
          }
        </>
        :
        <>
          <button className='flex space-x-2 text-white bg-blue-primary hover:bg-blue-700 rounded px-3 py-2 items-center text-sm' onClick={() => setToggle(!toggle)}>
              <span>Upload File</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
              </svg>
            </button>
        </>
      }
    </>
  )
}

export default ValidationData