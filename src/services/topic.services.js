import axios from "axios"

export const deleteTopic = (id) => {
  return axios.delete(`${process.env.REACT_APP_API_URI}/topic/${id}`).then((res) => {
    return res.data
  })
}