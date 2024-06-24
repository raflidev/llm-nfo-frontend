import React, { useContext, useEffect, useState } from 'react'
import Chat from '../molecules/Chat'
// import Typewritter from '../atoms/Typewritter'
import DataChatContext from '../context/DataChatContext';
import CQs from '../molecules/CQs';

export default function GridChat(props) {
  const { setLoading} = props
  const { chat, setChat, step, setStep, cq, setCq} = useContext(DataChatContext)
  console.log(cq.competency_questions);


  return (

      

      // {/* <Scrollbars autoHide
      //   autoHideTimeout={1000}
      //   autoHideDuration={200}> */}
      
      //     {/* </Scrollbars> */}

          <div className='grid grid-cols-1 gap-8'>
              {
                chat.map((item, index) => {
                  return (
                    <div key={index} className='space-y-8'>
                      <Chat isAi={false}>
                        {/* {
                          index % 2 === 0 ? item.content : <Typewritter setLoading={setLoading} text={item.content} delay={30} />
                        } */}
                        {item.prompt}
                      </Chat>
                      
                      <Chat isAi={true}>
                        <div className='space-y-2'>

                          {
                            cq.competency_questions.length > 0 ?
                            <CQs item={cq.competency_questions} index={index} setValue={setCq}/>
                            // <CQs item={cq[index]} index={index} setValue={setCq}/>
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
  )
}
