import React from 'react'
import Circle from '../atoms/Circle'
import TextMedium from '../atoms/TextMedium'
import ButtonNotActive from '../atoms/ButtonNotActive'

export default function Chat(props) {
  const { isAi, children } = props
  return (
    <div>
      <div className='flex justify-start space-x-4'>
        <div>
          {
            isAi ? <Circle color="bg-blue-primary"/> : <Circle color="bg-gray-50"/>
          }
        </div>
        <div className='w-5/6 items-center'>
          <TextMedium>
            {
              isAi ? 'LLM-NFO' : 'You'
            }
            {
              isAi ?<ButtonNotActive>Answer</ButtonNotActive> : null
            }
          </TextMedium>
          <div className=''>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
