import React, { useContext, useEffect, useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { devPrompt, sendMessage, sendMessageAPI, getTopic, getTopicById, getMessagesDev } from '../services/message.services'
import { json, useParams } from 'react-router-dom'
import DataChatContext from '../components/context/DataChatContext'
import UploadPopUp from '../components/organisms/UploadPopUp'
import StepByStep from '../components/organisms/StepByStep'
import { getConversationById } from '../services/conversation.services'
import { useQuery } from '@tanstack/react-query'
import GridCQ from '../components/organisms/GridCQ'
import { getConversationCQs } from '../services/cq.services'
import ImportantTerm from '../components/organisms/ImportantTerm'
import { getImportantTempByConvID } from '../services/importantTemp.services'
import Step5ValidationPage from './Step5ValidationPage'

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
  const {data: validCQ, isPending: isPendingValidCQ} = useQuery({queryKey: ['CQ', id], queryFn: () => getConversationCQs(id)})
  const {data: importantTerm, isPending: isPendingImportantTerm} = useQuery({queryKey: ['important_term', id], queryFn: () => getImportantTempByConvID(id)})

  useEffect(() => {
    if(conversation) {
      const data = JSON.parse(conversation?.data?.competency_questions)
      if(data){
        importantTerm?.data.data.length > 0 ? setStep(3) : setStep(2)
      }
      if(validCQ?.data.length > 0) {
        const data = validCQ?.data.filter((item) => item.is_valid).map((item) => item.question)
        // HARDCODED 
        setCq(data[0].slice(1,-1).split(","))
      }else{
        setCq(data.competency_questions)
      }
      setChat([conversation?.data])
    }
  }, [conversation, isPendingValidCQ, id])
  
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
                  Generate several competency questions with domain and scope specificity. You can adjusting the competency questions at STEP 2.
                  </div>
                </div> 
                <GridChat setLoading={isPendingConversation}/>
              </>
              : ''
            }

            {
              step === 2 ?
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Validate Question Generation</div>
                  <div className='font-light'>
                  Generate several competency questions with domain and scope specificity. Feel free to adjust the suggestions as needed to align with your specific ontology.
                  </div>
                </div> 
                <GridCQ setLoading={isPendingConversation}/>
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
                  Generate a list of important terms with domain and scope specificity. Users can upload a PDF or provide a URL based on the chosen domain and scope. Feel free to adjust the suggestions as needed to align with your specific ontology.
                  </div>
                </div> 
                <ImportantTerm/>
                {/* <GridChat setLoading={setLoading}/> */}
              </>
              : ''
            }

            {
              step === 4 ?
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Create Project in Protege App</div>
                  <div className='font-light'>
                  Create Project in Protégé App: In this step, initiate and configure a new ontology project. In the final step, please import the OWL file generated by the system.
                  </div>
                  <button className='py-2 px-3 bg-blue-primary hover:bg-blue-900 rounded-lg text-sm duration-300 mt-10' onClick={() => {setStep(5)}}>Next Step</button>
                </div> 
              </>
              :
              ''
            }

            {
              step === 5 ? 
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Validate classes, data property and object property</div>
                  <div className='font-light'>
                  Review and verify classes, data properties, and object properties based on the defined domain and scope. You can adjust definitions and relationships as needed.
                  </div>
                </div>

                <Step5ValidationPage/>
              </>
              :
              ''
            }


            {
              toggleUpload ? <UploadPopUp toggle={toggleUpload} setToggle={setToggleUpload} data={dataUpload} setData={setDataUpload} setDataName={setDataName} /> : ''
            }
          </div>
          :
          null
        }
        
        {/* {
          step === 2 ?
          <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={loading} toggle={toggleUpload} setToggle={setToggleUpload} />
          :
          ''
        } */}
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default ChatHistory