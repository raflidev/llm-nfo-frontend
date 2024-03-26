import React, { useEffect, useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { devPrompt, sendMessage, sendMessageAPI, getTopic, sendTopic } from '../services/message.service'
import { useNavigate } from 'react-router-dom'
import DataChatContext from '../components/context/DataChatContext'

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
        id: "1",
        title: "Renewable Energy 1",
        input: "My name is Dayat. Generate 9 competency questions focused on the integration and impact of solar panel technology within the renewable energy domain. Consider aspects such as efficiency, cost, environmental impact, and adoption barriers.",
        output: {
          CQs: [
            "How does the integration of solar panel technology impact the overall efficiency of renewable energy systems?",
            "What are the key factors that influence the cost of integrating solar panel technology into renewable energy systems?",
            "How does the environmental impact of solar panel technology compare to other renewable energy sources?",
            "What are the main barriers to the adoption of solar panel technology in the renewable energy sector?",
            "How does the efficiency of solar panel technology vary across different geographical locations?",
            "What are the potential economic benefits of integrating solar panel technology into the renewable energy sector?",
            "How does the environmental impact of solar panel technology change over its lifecycle?",
            "What are the key technological advancements that have improved the efficiency of solar panel technology in recent years?",
            "What are the social and cultural factors that influence the adoption of solar panel technology in different regions?"
          ],
          domain: "Renewable Energy",
          numCQs: "9",
          scope: "Integration and Impact of Solar Panel Technology"
        }
      },
      {
        id: "2",
        title: "Renewable Energy 2",
        input: "My name is Dayat. Generate 9 competency questions focused on the integration and impact of solar panel technology within the renewable energy domain. Consider aspects such as efficiency, cost, environmental impact, and adoption barriers.",
        output: {
          CQs: [
            "How does the integration of solar panel technology impact the overall efficiency of renewable energy systems?",
            "What are the key factors that influence the cost of integrating solar panel technology into renewable energy systems?",
            "How does the environmental impact of solar panel technology compare to other renewable energy sources?",
            "What are the main barriers to the adoption of solar panel technology in the renewable energy sector?",
            "How does the efficiency of solar panel technology vary across different geographical locations?",
            "What are the potential economic benefits of integrating solar panel technology into the renewable energy sector?",
            "How does the environmental impact of solar panel technology change over its lifecycle?",
            "What are the key technological advancements that have improved the efficiency of solar panel technology in recent years?",
            "What are the social and cultural factors that influence the adoption of solar panel technology in different regions?"
          ],
          domain: "Renewable Energy",
          numCQs: "9",
          scope: "Integration and Impact of Solar Panel Technology"
        }
      }
    ]
    setTopic(dummy)
    // setChat(dummy)
    
  }
    

  useEffect(() => {
    getTopicHandler()
  }, [])
  return (
    <DataChatContext.Provider value={{topic, setTopic, chat, setChat}}>
      <LayoutPage>
        <div className='font-bold uppercase py-7'>LLM-NFO</div>
        <GridChat setLoading={setLoading}/>
        
        <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={loading} />
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default Home