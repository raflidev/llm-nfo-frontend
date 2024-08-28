import React, { useEffect, useState } from 'react'
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
  const [isLogin, setIsLogin] = useState(false)


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

  useEffect(() => {
    if (user) {
      setIsLogin(true)
    }
  }, [user])

  return (
    <DataChatContext.Provider value={{topic, setTopic, chat, setChat, step, setStep}}>
      <LayoutPage>
        {
          isLogin ?
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
              <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={isPendingMessageMutate} toggle={toggleUpload} setToggle={setToggleUpload} />
            
          </>
          :
          <div className='flex justify-center h-[40rem] md:h-full'>
            <div className="my-auto">
              <div  class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-red-500 transition ease-in-out duration-150">
                Please log in to continue
              </div>
            </div>
          </div>
        }
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default Home