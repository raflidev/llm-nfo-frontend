import React, { useEffect, useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { devPrompt, sendMessage, sendMessageAPI, getTopic, sendTopic } from '../services/message.service'
import { redirect, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const [text, setText] = useState('')
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState([])
  
  const handleChange = (e) => {
    setText(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    // send 2 message, before and after the AI response
    
    setText('')
    const topic = await sendTopic(data_topic);
    const data_topic = {
      title: topic.topic,
    };

    const data_chat = {
      user_input: text,
      topic_id: topic._id,
    };

    const msg = await sendMessageAPI(data_chat);
    setChat(msg.topic.conversation_history)
    navigate("/chat/"+topic._id)
    setLoading(false)
  }

  const getTopicHandler = async () => {
    // prod
    // const res = await getTopic()
    // setTopic(res)

    // dev
    const dummy = [
      {
        _id: '1',
        title: 'test topic',
        conversation_history: [
          {
            role: 'user',
            content: 'Hi'
          },
          {
            role: 'assistant',
            content: 'Hello, how can I help you?'
          },
          {
            role: 'user',
            content: 'I want to know about LLM-NFO'
          },
          {
            role: 'assistant',
            content: 'LLM-NFO is a company that provides AI services'
          }
        ]
      }
    ]
    setTopic(dummy)
    setChat(dummy[0].conversation_history)
    
  }
    

  useEffect(() => {
    getTopicHandler()
  }, [])
  return (
    <LayoutPage topic={topic}>
      <div className='font-bold uppercase py-7'>LLM-NFO</div>
      <GridChat data={chat} setLoading={setLoading}/>
      
      <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={loading} />
    </LayoutPage>
  )
}

export default Home