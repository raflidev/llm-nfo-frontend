import axios from "axios"

export const sendMessage = () => {
  return axios.get('https://dummyjson.com/posts/1').then((res) => {
    return res.data
  })
}

export const sendMessageAPI = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URI}/chat`, data).then((res) => {
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