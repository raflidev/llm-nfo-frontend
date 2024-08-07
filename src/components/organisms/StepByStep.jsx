import React, { useContext } from 'react'
import DataChatContext from '../context/DataChatContext'
import { useLocation } from 'react-router-dom'


export default function StepByStep() {
  const { step, setStep} = useContext(DataChatContext)
  const location = useLocation()
  return (
    <div className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-1 py-6 place-items-center'>
      {
        [1,2,3,4,5,6,7].map((item, index) => {
          return(
            <div className='flex w-full space-x-2' key={index}>
              {location.pathname === '/' ?
                <button onClick={() => setStep(index+1)} disabled className={' rounded-full h-12 w-12 inline-block content-center duration-200 ' + `${index+1 <= step ? 'bg-blue-primary hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-500 text-black hover:text-white'}`}>
                  <div className="flex justify-center">
                    {item}
                  </div>
                </button>
              :
                item === 4 ?
                <button onClick={() => setStep(index+1)} className={' rounded-full h-12 w-12 inline-block content-center duration-200 cursor-pointer ' + `${index+1 <= step ? 'bg-yellow-400 hover:bg-yellow-500 text-black hover:text-white' : 'bg-gray-50 hover:bg-yellow-400 text-black hover:text-black'}`}>
                <div className="flex justify-center">
                  {item}
                </div>
              </button>
              :
              <button onClick={() => setStep(index+1)} className={' rounded-full h-12 w-12 inline-block content-center duration-200 cursor-pointer ' + `${index+1 <= step ? 'bg-blue-primary hover:bg-blue-800' : 'bg-gray-50 hover:bg-blue-primary text-black hover:text-white'}`}>
                <div className="flex justify-center">
                  {item}
                </div>
              </button>
              }
              {
                [1,2,3,4,5,6,7].length - 1 !== index ?
                <div className='w-3/6 content-center'>
                  {
                    index+1 <= step ?
                    index === 3 ?
                      <div className='bg-yellow-400 h-2 rounded-full'></div>
                    :
                      <div className='bg-blue-primary h-2 rounded-full'></div>
                    :
                    <div className='bg-gray-50 h-2 rounded-full'></div>
                  }
                </div>
                :
                ''
              }
            </div>
          )
        })
      }
        
          
        </div>
  )
}
