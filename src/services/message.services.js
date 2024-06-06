import axios from "axios"

export const getMessagesDev = () => {
  return [
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
}

export const sendMessage = () => {
  return axios.get('https://dummyjson.com/posts/1').then((res) => {
    return res.data
  })
}

export const sendMessageAPI = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URI}/conversation`, data).then((res) => {
    console.log(res.data);
    return res.data
  })
}

export const sendTopic = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URI}/topic`, data).then((res) => {
    return res.data
  })
}

export const getTopic = () => {
  return axios.get(`${process.env.REACT_APP_API_URI}/topic`).then((res) => {
    return res.data
  })
}

export const getTopicById = (topic_id) => {
  return axios.get(`${process.env.REACT_APP_API_URI}/topic/${topic_id}`).then((res) => {
    return res.data
  })
}

export const devPrompt = (data) => {
  const res = {
    "response": "asd",
    "conversation_history": data.conversation_history
  }

  // push
  res.conversation_history.push({
    "role": "user",
    "content": data.user_input
  })

  // push
  res.conversation_history.push({
    "role": "assistant",
    "content": "asd"
  })
  return res
}