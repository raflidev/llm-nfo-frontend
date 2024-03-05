import React, { useEffect, useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { devPrompt, sendMessage, sendMessageAPI, getTopic, getTopicById } from '../services/message.service'
import { useParams } from 'react-router-dom'

function ChatHistory() {
  const {id} = useParams()
  const [text, setText] = useState('')
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingTopic, setLoadingTopic] = useState(false)
  const [topic, setTopic] = useState([])
  
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
    setLoadingTopic(true)
    const res = await getTopic()
    setTopic(res)
    const chat = await getTopicById(id)
    setChat(chat.conversation_history)
    setLoadingTopic(false)
    
  }
    


  useEffect(() => {
    getTopicHandler(id)
  }, [id])
  return (
    <LayoutPage topic={topic}>
      {
        !loadingTopic ? 
        <div>
          <div className='font-bold uppercase py-7'>AI-Interlinked</div>
          <GridChat data={chat} setLoading={setLoading}/>
        </div>
        :
        null
      }
      
      <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={loading} />
    </LayoutPage>
  )
}

export default ChatHistory