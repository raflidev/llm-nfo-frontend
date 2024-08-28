import React, { useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { sendMessageAPI } from '../services/message.services'
import { useNavigate } from 'react-router-dom'
import DataChatContext from '../components/context/DataChatContext'
import UploadPopUp from '../components/organisms/UploadPopUp'
import StepByStep from '../components/organisms/StepByStep'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfile } from '../services/auth.services'

function Home() {
  const navigate = useNavigate();
  const [text, setText] = useState('')
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState([])
  const [toggleUpload, setToggleUpload] = useState(false)
  const [dataUpload, setDataUpload] = useState([])
  const [dataName, setDataName] = useState('')
  const [step, setStep] = useState(1)


  const queryClient = useQueryClient()
  const {data: user, isPending: isPendingProfile} = useQuery({queryKey: ['profile'], queryFn: () => getProfile()})

  const {mutate: sendMessageMutate, isPending: isPendingMessageMutate} = useMutation({mutationFn: sendMessageAPI, 
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['topic']})
    navigate(`/chat/${data.output.conversation_id}/1`)
    }
    })
  
  const handleChange = (e) => {
    setText(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    
    const data = {
      prompt: text,
    };

    sendMessageMutate(data)
  }

  return (
    <DataChatContext.Provider value={{topic, setTopic, chat, setChat, step, setStep}}>
      <LayoutPage>
        {
          !isPendingProfile ?
          <>
            <StepByStep/>

            <div className='py-6'>
              <div className='text-sm'>STEP 1</div>
              <div className='font-semibold text-3xl'>Domain and scope</div>
              <div className='font-light'>
                Generate several competency questions with domain and scope specificity based on the domain and scope you have defined, adjusting the number of questions and the wording as needed
              </div>
            </div> 
            <GridChat setLoading={setLoading}/>
            
            {
              toggleUpload ? <UploadPopUp toggle={toggleUpload} setToggle={setToggleUpload} data={dataUpload} setData={setDataUpload} setDataName={setDataName} /> : ''
            }
            {
              user ?
              <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={isPendingMessageMutate} toggle={toggleUpload} setToggle={setToggleUpload} />
              :
              ''
            }
          </>
          :
          <div className='flex justify-center h-[40rem] md:h-full'>
            <div className="my-auto">
              <button type="button" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-gray-500 hover:bg-gray-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading..
              </button>
            </div>
          </div>
        }
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default Home