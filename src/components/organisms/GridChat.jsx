import React from 'react'
import Chat from '../molecules/Chat'
import Typewritter from '../atoms/Typewritter'
import { Scrollbars } from 'react-custom-scrollbars-2';

export default function GridChat(props) {
  const {data, setLoading} = props
  return (
    <div className='flex justify-center h-[75vh] overflow-y-auto'>
      <div className='w-full md:w-1/2'>
        <Scrollbars autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}>
          <div className='grid grid-cols-1 gap-8 px-2 md:px-10'>
              {
                data.map((item, index) => {
                  return (
                    <Chat key={index} isAi={index % 2 === 0 ? false : true}>
                      {/* {
                        index % 2 === 0 ? item.content : <Typewritter setLoading={setLoading} text={item.content} delay={30} />
                      } */}
                      {item.content}
                      
                    </Chat>
                  )
                })
              }
          </div>
            </Scrollbars>
      </div>
      </div>
  )
}
