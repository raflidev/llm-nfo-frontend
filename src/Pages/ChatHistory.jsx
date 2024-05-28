import React, { useContext, useEffect, useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { devPrompt, sendMessage, sendMessageAPI, getTopic, getTopicById, getMessagesDev } from '../services/message.services'
import { useParams } from 'react-router-dom'
import DataChatContext from '../components/context/DataChatContext'
import UploadPopUp from '../components/organisms/UploadPopUp'
import StepByStep from '../components/organisms/StepByStep'

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
  
  const handleChange = (e) => {
    setText(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    // send 2 message, before and after the AI response
    
    setText('')
    const data = {
      user_input: text,
      topic_id: id
    };
    // prod proposed
    const msg = await sendMessageAPI(data);

    setChat(msg.topic.conversation_history)
    setLoading(false)
  }

  const getTopicHandler = async (id) => {
    // setLoadingTopic(true)
    const dummy = await getMessagesDev()
    const setDataDummy = dummy.find((item) => item.id === id)

    setTopic(dummy)
    setChat([setDataDummy])
    // setLoadingTopic(false)  
  } 

  useEffect(() => {
    getTopicHandler(id)
  }, [id])
  return (
    <DataChatContext.Provider value={{topic, setTopic, chat, setChat, step, setStep}}>
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
                <GridChat setLoading={setLoading}/>
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
                <GridChat setLoading={setLoading}/>
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
                <GridChat setLoading={setLoading}/>
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
        
        <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={loading} toggle={toggleUpload} setToggle={setToggleUpload} />
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default ChatHistory