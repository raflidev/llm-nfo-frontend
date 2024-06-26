import React, { useContext, useEffect, useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { devPrompt, sendMessage, sendMessageAPI, getTopic, getTopicById, getMessagesDev } from '../services/message.services'
import { useParams } from 'react-router-dom'
import DataChatContext from '../components/context/DataChatContext'
import UploadPopUp from '../components/organisms/UploadPopUp'
import StepByStep from '../components/organisms/StepByStep'
import { getConversationById } from '../services/conversation.services'
import { useQuery } from '@tanstack/react-query'

function ChatHistory() {
  const {id} = useParams()
  const [text, setText] = useState('')
  // const [chat, setChat] = useState([])
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingTopic, setLoadingTopic] = useState(false)
  const [topic, setTopic] = useState([])
  const [toggleUpload, setToggleUpload] = useState(false)
  const [dataUpload, setDataUpload] = useState([])
  const [dataName, setDataName] = useState('')
  const [step, setStep] = useState(1)
  const [cq, setCq] = useState([])

  const {data: conversation, isPending: isPendingConversation} = useQuery({queryKey: ['conversation', id], queryFn: () => getConversationById(id)})
  

  useEffect(() => {
    if(conversation) {
      const data = JSON.parse(conversation?.data?.competency_questions)
      if(data){
        setStep(2)
      }
      setCq(data.competency_questions)
      setChat([conversation?.data])
    }
  }, [conversation])
  
  const handleChange = (e) => {
    setText(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <DataChatContext.Provider value={{topic, setTopic, chat, setChat, step, setStep, cq, setCq}}>
      <LayoutPage>
        {
          !loadingTopic ? 
          <div>
            
            <StepByStep/>

            {
              step === 1 ? 
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Domain and scope</div>
                  <div className='font-light'>
                  Generate several competency questions with domain and scope specificity. Feel free to adjust the suggestions as needed to align with your specific ontology.
                  </div>
                </div> 
                {/* <GridChat setLoading={setLoading}/> */}
              </>
              : ''
            }

            {
              step === 2 ?
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Question Generation</div>
                  <div className='font-light'>
                  Generate competency questions based on the domain and scope you have defined. You can adjust the number of questions and the wording as needed.
                  </div>
                </div> 
                <GridChat setLoading={isPendingConversation}/>
              </>
              : ''
            }

            {
              step === 3 ?
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Enumerate Important Terms</div>
                  <div className='font-light'>
                  Generate competency questions based on the domain and scope you have defined. You can adjust the number of questions and the wording as needed.
                  </div>
                </div> 
                {/* <GridChat setLoading={setLoading}/> */}
              </>
              : ''
            }


            {
              toggleUpload ? <UploadPopUp toggle={toggleUpload} setToggle={setToggleUpload} data={dataUpload} setData={setDataUpload} setDataName={setDataName} /> : ''
            }
          </div>
          :
          null
        }
        
        {
          step === 1 ?
          <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={loading} toggle={toggleUpload} setToggle={setToggleUpload} />
          :
          ''
        }
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default ChatHistory