import axios from "axios"

export const getConversationByUserId = (user_id) => {
    return axios.get(`${process.env.REACT_APP_API_URI}/conversation/all/${user_id}`).then((res) => {
        return res.data
    })
}