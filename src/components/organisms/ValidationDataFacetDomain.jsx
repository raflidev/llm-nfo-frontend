import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postSaveImportantTempByConvID } from '../../services/importantTemp.services'
import { QueryClient, useMutation } from '@tanstack/react-query'
import IconPlus from '../atoms/Icon/IconPlus'
import ButtonLoading from '../atoms/ButtonLoading'
import { Slide, toast } from 'react-toastify'
import DataChatContext from '../context/DataChatContext'

function ValidationDataFacetDomain(props) {
  const {data, saveFunction} = props
  const {id} = useParams()

  // console.log(data);
  
  
  const {setStep} = useContext(DataChatContext)
  const queryClient = new QueryClient()
  
  const [termItem, setTermItem] = useState(data)
  const [confirmation, setConfirmation] = useState(false)
  const changeHandle = (e, indexCQ, index, index2) => {
    console.log(termItem);
    
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][1][index][1][index2].domain_name = e.target.value
      return newItems
    })
  }

  const changeHandleRange = (e, indexCQ, index, index2, index3) => {
    console.log(termItem);

    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][1][index][1][index2].ranges[index3].range_name = e.target.value
      return newItems
    })
  }


  const deleteCQ = (cq, indexCQ, indexItem, index2) => {
    // delete item by indexCQ
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][1][indexItem][1].splice(index2, 1)
      return newItems
    })
  }

  const deleteCQRange = (cq, indexCQ, indexItem, index2, index3) => {
    // delete item by indexCQ
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][1][indexItem][1][index2].ranges.splice(index3, 1)
      return newItems
    })
  }
  

  const saveAllItem = () => {
    const data = {
      "item": termItem
    }
    // setItem(data)
    // console.log(data);
    saveFunction(data)
  }

  const resetAllCQ = () => {
    window.location.reload()
  }

  const addItemHandler = (index, index2) => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[index][1][index2][1].push({domain_name: '', ranges: []})
      return newItems
    })
    
  }

  const addItemRangeHandler = (indexCQ, index, index2) => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ][1][index][1][index2].ranges.push({range_name: ''})
      return newItems
    })

    console.log(indexCQ, index, index2);
    
    // [0][0][2][1]
    
  }

  const saveAllUI = () => {
    setConfirmation(!confirmation)
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
                    <h1 className='font-semibold'>Class Name: {cqItem[0]}</h1>
                    {
                      cqItem[1].map((item, index) => {
                        return (
                          <div className='space-y-2' key={index}>
                            <div className="">
                              <div className='font-semibold'>Object Name: {item[0]}</div>
                              <div key={index} className='grid gap-3 items-center'>
                                {
                                  item[1].map((item2, index2) => {
                                    return (
                                      <div key={`domain-${index}-${index2}`} className='space-y-3' >
                                        <div className='text-sm font-semibold'>Domain: </div>
                                        <div className='w-full space-x-3 items-center flex'>
                                          <textarea key={index2} className='flex w-full bg-transparent border border-white p-1 rounded' value={item2.domain_name} onChange={(e) => changeHandle(e, indexCQ, index, index2)} />
                                         
                                          <div className='flex space-x-1'>
                                            <button className='hover:bg-red-500 p-1 rounded duration-200' onClick={() => deleteCQ(cqItem, indexCQ, index, index2)}>
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                              </svg>
                                            </button>
                                          </div>

                                          
                                        </div>
                                        <div className='text-sm font-semibold'>Range: </div>
                                          {
                                            item2.ranges.map((item3, index3) => {          
                                              return <div key={`range-${index3}`} className='flex items-center space-x-3'>
                                               
                                                  <textarea  className='ml-3 flex w-full bg-transparent border border-white p-1 rounded' value={item3.range_name} onChange={(e) => changeHandleRange(e, indexCQ, index, index2, index3)} />

                                               
                                                <div className='flex space-x-1'>
                                                <button className='hover:bg-red-500 p-1 rounded duration-200' onClick={() => deleteCQRange(cqItem, indexCQ, index, index2, index3)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                  </svg>
                                                </button>
                                              </div>
                                              </div>
                                            })
                                          }
                                        <div className=''>
                                          <button onClick={() => addItemRangeHandler(indexCQ, index, index2)} className='py-1 px-3 ml-3 bg-green-600 hover:bg-green-900 rounded-lg text-sm duration-300 flex space-x-1 item-center'>
                                            <IconPlus/>
                                            <span>Add Range</span>
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>

                            <div className='pt-3'>
                              <button onClick={() => addItemHandler(indexCQ, index)} className='py-1 px-3 bg-green-600 hover:bg-green-900 rounded-lg text-sm duration-300 flex space-x-1 item-center'>
                                <IconPlus/>
                                <span>Add Domain</span>
                              </button>
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
              <button className='py-2 px-3 bg-blue-primary hover:bg-blue-900 rounded-lg text-sm duration-300' onClick={() => saveAllUI()}>Save All</button>
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

export default ValidationDataFacetDomain