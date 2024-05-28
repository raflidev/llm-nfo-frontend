import React, { useContext } from 'react'
import DataChatContext from '../context/DataChatContext'


export default function StepByStep() {
  const { step, setStep} = useContext(DataChatContext)
  return (
    <div className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-1 py-6 place-items-center'>
      {
        [1,2,3,4,5,6,7].map((item, index) => {
          return(
            <div className='flex w-full justify-between' key={index}>
              <button onClick={() => setStep(index+1)} className={' rounded-full h-12 w-12 inline-block content-center duration-200 cursor-pointer ' + `${index+1 <= step ? 'bg-blue-primary hover:bg-blue-800' : 'bg-gray-50 hover:bg-blue-primary text-black hover:text-white'}`}>
                <div className="flex justify-center">
                  {item}
                </div>
              </button>
              {
                [1,2,3,4,5,6,7].length - 1 !== index ?
                <div className='w-3/6 content-center'>
                  <div className={`${index+1 <= step ? 'bg-blue-primary' : 'bg-gray-50'} h-2 rounded-full`}></div>
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
