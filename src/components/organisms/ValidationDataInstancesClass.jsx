import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postSaveImportantTempByConvID } from '../../services/importantTemp.services'
import { QueryClient, useMutation } from '@tanstack/react-query'
import IconPlus from '../atoms/Icon/IconPlus'
import ButtonLoading from '../atoms/ButtonLoading'
import { Slide, toast } from 'react-toastify'
import DataChatContext from '../context/DataChatContext'
import IconDownload from '../atoms/Icon/IconDownload'

function ValidationDataInstancesClass(props) {
  const {data, saveFunction} = props
  const {id} = useParams()

  // console.log(data);
  
  
  const {setStep} = useContext(DataChatContext)
  const queryClient = new QueryClient()
  
  const [termItem, setTermItem] = useState(data)
  const [confirmation, setConfirmation] = useState(false)
  const changeHandle = (e, indexCQ) => {
    console.log(termItem);
    // [0].class_name
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ].class_name = e.target.value
      return newItems
    })
  }

  const changeHandleRange = (e, indexCQ, index2) => {
    console.log(termItem);

    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ].instances[index2].instance_name = e.target.value
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

  const deleteCQRange = (cq, indexCQ, index2) => {
    // delete item by indexCQ
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ].instances.splice(index2, 1)
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

  const addItemHandler = () => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems.push({class_name: '', instances: [{instance_name: ''}]})
      return newItems
    })
    
  }

  const addItemRangeHandler = (indexCQ, index2) => {
    setTermItem((prev) => {
      let newItems = [...prev]
      newItems[indexCQ].instances.push({instance_name: ''})
      return newItems
    })
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
                    <div key={indexCQ} className='space-y-3' >
                      <div className='text-sm font-semibold'>Class Name: </div>
                      <div className='text-lg font-semibold'>
                        {cqItem.class_name}
                      </div>
                      <div className='text-sm font-semibold'>Instance:</div>
                      {
                        cqItem?.instances.map((item2, index2) => {
                          return <div key={`range-${index2}`} className='flex items-center space-x-3'>
                                               
                             <textarea  className='ml-3 flex w-full bg-transparent border border-white p-1 rounded' value={item2.instance_name} onChange={(e) => changeHandleRange(e, indexCQ, index2)} />

                                               
                           <div className='flex space-x-1'>
                           <button className='hover:bg-red-500 p-1 rounded duration-200' onClick={() => deleteCQRange(cqItem, indexCQ, index2)}>
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                             </svg>
                           </button>
                         </div>
                         </div>
                        })
                      }
                        <button onClick={() => addItemRangeHandler(indexCQ, indexCQ)} className='py-1 px-3 ml-3 bg-green-600 hover:bg-green-900 rounded-lg text-sm duration-300 flex space-x-1 item-center'>
                           <IconPlus/>
                           <span>Add Instance</span>
                        </button>
                    </div>
                    </div>
                </div>
              )
            })}

          </div>

          {
            !confirmation ? 
            <div className='space-x-2 flex justify-between pt-5'>
               <a href={`https://ontology-api.hidayattaufiqur.dev/generation/ontology/${id}`} className='flex space-x-2 items-center py-2 px-3 bg-blue-primary hover:bg-blue-900 rounded-lg text-sm duration-300'>
                <IconDownload/>
                <span>Download</span>
              </a>
              <div>
                <button className='py-2 px-3 hover:underline rounded-lg text-sm duration-300' onClick={() => resetAllCQ()}>Reset</button>
                <button className='py-2 px-3 bg-blue-primary hover:bg-blue-900 rounded-lg text-sm duration-300' onClick={() => saveAllUI()}>Save All</button>
              </div>
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

export default ValidationDataInstancesClass