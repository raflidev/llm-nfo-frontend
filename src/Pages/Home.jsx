import React, { useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { sendMessageAPI } from '../services/message.services'
import { useNavigate } from 'react-router-dom'
import DataChatContext from '../components/context/DataChatContext'
import UploadPopUp from '../components/organisms/UploadPopUp'
import StepByStep from '../components/organisms/StepByStep'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

  const {mutate: sendMessageMutate, isPending: isPendingMessageMutate} = useMutation({mutationFn: sendMessageAPI, 
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['topic']})
      navigate(`/chat/${data.output.conversation_id}`)
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
    console.log(data);
    sendMessageMutate(data)
  }

  return (
    <DataChatContext.Provider value={{topic, setTopic, chat, setChat, step, setStep}}>
      <LayoutPage>
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

        {/* <div className='w-full'>
          <div className='flex justify-center'>
            <div className='flex w-full md:w-1/2'>
              {
                dataName.length > 0 ? 
                  <div className='bg-gray-50 text-black p-2 rounded-md text-sm space-y-2'>
                    <button type="button" className='float-right hover:bg-red-500 rounded-full' onClick={() => {setDataUpload([]); setDataName([])}}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <span>{dataName}</span>
                  </div> : ''
              }
            </div>
          </div>
        </div> */}
        <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={loading} toggle={toggleUpload} setToggle={setToggleUpload} />
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default Home