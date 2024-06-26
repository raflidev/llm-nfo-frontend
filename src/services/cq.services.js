import axios from 'axios'

export const saveCQFromConversationID = async (data) => {
  return axios.post(`${process.env.REACT_APP_API_URI}/conversation/competency_questions/${data.id}`, data, {
    withCredentials: true
  })
  .then((response) => {
    return response.data
  })
}