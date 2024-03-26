import React, { useContext, useEffect, useState } from 'react'
import Chat from '../molecules/Chat'
// import Typewritter from '../atoms/Typewritter'
import { Scrollbars } from 'react-custom-scrollbars-2';
import DataChatContext from '../context/DataChatContext';
import CQs from '../molecules/CQs';

export default function GridChat(props) {
  const { setLoading} = props
  const { chat, setChat} = useContext(DataChatContext)

  const [cq, setCq] = useState([])


  useEffect(() => {
    setCq(chat.map((item) => item.output.CQs))
  }, [chat])
  return (
    <div className='flex justify-center h-[75vh] overflow-y-auto'>
      <div className='w-full md:w-11/12 lg:w-1/2'>
        <Scrollbars autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}>
          <div className='grid grid-cols-1 gap-8 px-2 md:px-10'>
              {
                chat.map((item, index) => {
                  return (
                    <div key={index} className='space-y-8'>
                      <Chat isAi={false}>
                        {/* {
                          index % 2 === 0 ? item.content : <Typewritter setLoading={setLoading} text={item.content} delay={30} />
                        } */}
                        {item.input}
                      </Chat>
                      
                      <Chat isAi={true}>
                        <div className='space-y-2'>
                          {
                            cq.length > 0 ?
                            <CQs item={cq[index]} index={index} setValue={setCq}/>
                            :
                            ''
                          }
                        </div>
                      </Chat>
                    </div>
                  )
                })
              }
          </div>
            </Scrollbars>
      </div>
      </div>
  )
}
