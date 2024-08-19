import React, { useContext, useEffect, useState } from 'react'
import LayoutPage from '../components/templates/LayoutPage'
import { useParams } from 'react-router-dom'
import DataChatContext from '../components/context/DataChatContext'
import UploadPopUp from '../components/organisms/UploadPopUp'
import StepByStep from '../components/organisms/StepByStep'
import { getConversationById } from '../services/conversation.services'
import { useQuery } from '@tanstack/react-query'
import GridCQ from '../components/organisms/GridCQ'
import { getConversationCQs } from '../services/cq.services'
import ImportantTerm from '../components/organisms/ImportantTerm'
import Step5ValidationPage from './Step5ValidationPage'
import Step4ValidationPage from './Step4ValidationPage'
import { getImportantTempByConvID } from '../services/importantTemp.services'

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
  const [iTerm, setITerm] = useState([])

  const {data: conversation, isPending: isPendingConversation} = useQuery({queryKey: ['conversation', id], queryFn: () => getConversationById(id)})
  const {data: validCQ, isPending: isPendingValidCQ} = useQuery({queryKey: ['CQ', id], queryFn: () => getConversationCQs(id)})
  const {data: importantTerm, isPending: isPendingImportantTerm, refetch} = useQuery({queryKey: ['important_term', id], queryFn: () => getImportantTempByConvID(id)})

  useEffect(() => {
    if(conversation) {
      const data = JSON.parse(conversation?.data?.competency_questions)
      setITerm([])
      var Term = null
      if(importantTerm?.data.data.length > 0) {
        Term = importantTerm?.data.data[importantTerm?.data.data.length - 1]
        
        setITerm(Term?.terms.slice(1, -1).split(","))
        
      }
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
  }, [conversation, isPendingValidCQ, id, importantTerm])


  return (
    <DataChatContext.Provider value={{topic, setTopic, chat, setChat, step, setStep, cq, setCq, iTerm, setITerm}}>
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
                {/* <GridChat setLoading={isPendingConversation}/> */}
                <GridCQ setLoading={isPendingConversation}/>
              </>
              : ''
            }

            {
              step === 2 ?
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Reuse existing ontologies</div>
                  <div className='font-light'>
                  Reuse Existing Ontologies: Integrate and adapt ontologies that have been previously developed to fit within your current project. This process involves selecting relevant ontologies, aligning them with your domain, and making necessary modifications to ensure compatibility and consistency with your project's requirements.
                  </div>
                </div> 
                {/* <GridCQ setLoading={isPendingConversation}/> */}
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
                  <div className='font-semibold text-3xl'>Validate Classes</div>
                  <div className='font-light'>
                  Review and verify classes based on the defined domain and scope. You can adjust as needed.
                  </div>
                  <Step4ValidationPage/>
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
                  <div className='font-semibold text-3xl'>Validate data property and object property</div>
                  <div className='font-light'>
                  Review and verify data properties and object properties based on the defined domain and scope. You can adjust definitions and relationships as needed.
                  </div>
                </div>

                <Step5ValidationPage/>
              </>
              :
              ''
            }

            {
              step === 6 ? 
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Validate Facet of the properties</div>
                  <div className='font-light'>
                    Ensure the accuracy and consistency of property attributes within a specific domain, aligning them with established standards.
                  </div>
                </div>

                <Step5ValidationPage/>
              </>
              :
              ''
            }

            {
              step === 7 ? 
              <>
                <div className='py-6'>
                  <div className='text-sm'>STEP {step}</div>
                  <div className='font-semibold text-3xl'>Create Instances Class</div>
                  <div className='font-light'>
                    Create class instances based on defined attributes, then validate them using competency questions to ensure alignment with the domain’s goals
                  </div>
                </div>
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
        
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default ChatHistory