import React, { useContext } from 'react'
import DataChatContext from '../context/DataChatContext'
import CQs from '../molecules/CQs'
import Chat from '../molecules/Chat'

function GridCQ(props) {
  const { setLoading } = props
  const { chat, setChat, step, setStep, cq, setCq} = useContext(DataChatContext)

  return (
    <div className='grid grid-cols-1 gap-8'>
        {
          chat.map((item, index) => {
            return (
              <div key={index} className='space-y-8'>
                <Chat isAi={false}>
                  {item.prompt}
                </Chat>
                
                <Chat isAi={true}>
                  <div className='space-y-2 mb-10'>
                    {
                      cq !== undefined && cq.length > 0 ?
                      <CQs item={cq} index={index} setValue={setCq}/>
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

export default GridCQ