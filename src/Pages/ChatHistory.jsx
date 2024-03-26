import React, { useContext, useEffect, useState } from 'react'
import GridChat from '../components/organisms/GridChat'
import LayoutPage from '../components/templates/LayoutPage'
import InputBottom from '../components/organisms/InputBottom'
import { devPrompt, sendMessage, sendMessageAPI, getTopic, getTopicById } from '../services/message.service'
import { useParams } from 'react-router-dom'
import DataChatContext from '../components/context/DataChatContext'

function ChatHistory() {
  const {id} = useParams()
  const [text, setText] = useState('')
  // const [chat, setChat] = useState([])
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
        input: "My name is Rafli. Generate 4 competency questions focused on the integration and impact of solar panel technology within the renewable energy domain. Consider aspects such as efficiency, cost, environmental impact, and adoption barriers.",
        output: {
          CQs: [
            "How does the integration of solar panel technology impact the overall efficiency of renewable energy systems?",
            "What are the key factors that influence the cost of integrating solar panel technology into renewable energy systems?",
            "How does the environmental impact of solar panel technology compare to other renewable energy sources?",
            "What are the main barriers to the adoption of solar panel technology in the renewable energy sector?",
          ],
          domain: "Renewable Energy",
          numCQs: "9",
          scope: "Integration and Impact of Solar Panel Technology"
        }
      }
    ]
    setTopic(dummy)
    setChat([dummy[id-1]])
    console.log([dummy[id-1]]);
    // setLoadingTopic(true)
    // const res = await getTopic()
    // setTopic(res)
    // const chat = await getTopicById(id)
    // setChat(chat.conversation_history)
    // setLoadingTopic(false)
    
  }
    


  useEffect(() => {
    getTopicHandler(id)
  }, [id])
  return (
    <DataChatContext.Provider value={{topic, setTopic, chat, setChat}}>
      <LayoutPage>
        {
          !loadingTopic ? 
          <div>
            <div className='font-bold uppercase py-7'>LLM-NFO</div>
            <GridChat setLoading={setLoading}/>
          </div>
          :
          null
        }
        
        <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={loading} />
      </LayoutPage>
    </DataChatContext.Provider>
  )
}

export default ChatHistory