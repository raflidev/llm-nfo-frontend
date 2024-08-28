import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postSaveImportantTempByConvID } from '../../services/importantTemp.services'
import { QueryClient, useMutation } from '@tanstack/react-query'
import IconPlus from '../atoms/Icon/IconPlus'
import ButtonLoading from '../atoms/ButtonLoading'
import { Slide, toast } from 'react-toastify'
import DataChatContext from '../context/DataChatContext'

function ValidationDataFacet(props) {
  const {data, saveFunction} = props
  const {id} = useParams()
  
  const {setStep} = useContext(DataChatContext)
  const queryClient = new QueryClient()
  
  const [termItem, setTermItem] = useState(data)
  const [confirmation, setConfirmation] = useState(false)
  const [saveItem, setSaveItem] = useState(
    termItem?.map((item) => {
      return item[1].map((item2) => {
        return false
      })
    })
  )
  
  // const {mutate: saveItemFunc, isPending: isPendingSaveItem} = useMutation({mutationFn: postSaveImportantTempByConvID,
  //   onSuccess: (response) => {
  //     if(response.status === 200){
  //       toast.success(response.data.message, {
  //         transition: Slide
  //       })
  //       queryClient.invalidateQueries({queryKey: ['important_term', id]})
  //       setStep(4)
  //     }
  //   }
  // })

  const changeHandle = (e, indexCQ, index) => {
    console.log(termItem);
    
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][1][index][1] = e.target.value
      return newItems
    })
  }

  const saveCQ = (cq, indexCQ, indexItem) => {
    // save item by indexCQ
    setSaveItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][indexItem] = true
      return newItems
    })
  }

  const deleteCQ = (cq, indexCQ, indexItem) => {
    // delete item by indexCQ
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][1].splice(indexItem, 1)
      return newItems
    })
  }

  const saveAllItem = () => {
    const data = {
      "item": termItem
    }
    // console.log(data);
    
    // setItem(data)
    saveFunction(data)
  }

  const resetAllCQ = () => {
    window.location.reload()
  }

  const addItemHandler = (index) => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[index][1].push('')
      return newItems
    })

    setSaveItem((prev) => {
      let newItems = [...prev]
      newItems[index].push(false)
      return newItems
    })

    console.log(termItem);
    
  }

  return (
    <>
      {
        termItem?.length > 0 ?
        <>
          <div className='space-y-2'>
            {termItem.map((cqItem, indexCQ) => {
              return (
                <div key={indexCQ}>
                  <div className="border border-black rounded p-4 space-y-4">
                    <div className='space-y-1'>
                      <h1 className='text-sm font-semibold'>Class name:</h1>
                      <div className='text-lg font-semibold'>
                        {cqItem[0]}
                      </div>
                    </div>
                    {
                      cqItem[1].map((item, index) => {
                        return (
                          <div className='space-y-2' key={index}>
                            <div className='space-y-1'>
                              <div className='text-sm font-semibold'>Data Property Name:</div>
                              <div className='font-semibold text-lg'>{item[0]}</div>
                            </div>
                            <div className='text-sm font-semibold'>Type: </div>
                            <div key={index} className='flex space-x-3 items-center'>
                              {!saveItem[indexCQ][index] ?
                                <textarea className='flex w-full bg-transparent border border-white p-1 rounded' value={item[1]} onChange={(e) => changeHandle(e, indexCQ, index)} />
                              :
                                <textarea className='flex w-full bg-transparent border border-white p-1 rounded' value={item[1]} disabled />
                              }
                              {!saveItem[indexCQ][index] ? 
                                <div className='flex space-x-1'>
                                  <button className='hover:bg-blue-primary p-1 rounded duration-200' onClick={() => saveCQ(cqItem, indexCQ, index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                  </button>
                                  <button className='hover:bg-red-500 p-1 rounded duration-200' onClick={() => deleteCQ(cqItem, indexCQ, index)}>
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
                          </div>
                        )
                      })
                    }
                      {/* <div className='pt-3'>
                        <button onClick={() => addItemHandler(indexCQ)} className='py-1 px-3 bg-green-600 hover:bg-green-900 rounded-lg text-sm duration-300 flex space-x-1 item-center'>
                          <IconPlus/>
                          <span>Add Item</span>
                        </button>
                      </div> */}
                    </div>
                  </div>
              )
            })}
          </div>

          {
            !confirmation ? 
            <div className='space-x-2 flex justify-end pt-5'>
              <button className='py-2 px-3 hover:underline rounded-lg text-sm duration-300' onClick={() => resetAllCQ()}>Reset</button>
              <button className='py-2 px-3 bg-blue-primary hover:bg-blue-900 rounded-lg text-sm duration-300' onClick={() => {setConfirmation(!confirmation);setSaveItem(termItem?.map((item) => {
      return item[1].map((item2) => {
        return true
      })
    }))}}>Save All</button>
            </div>
            :
            <div className='space-x-2 flex justify-end pt-5'>
              <button className='py-2 px-3 hover:underline rounded-lg text-sm duration-300' onClick={() => setConfirmation(!confirmation)}>Cancel</button>
              {/* ISLOADING */}
              <ButtonLoading onClick={() => saveAllItem(termItem)} type='button'>Are you sure?</ButtonLoading>
            </div>
          }
        </>
        :
        ''
      }
    </>
  )
}

export default ValidationDataFacet