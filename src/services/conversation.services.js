import axios from "axios"
const user = JSON.parse(localStorage.getItem('user')) || null
export const getConversationByUserId = async (user_id) => {
    return await axios.get(`${process.env.REACT_APP_API_URI}/conversation/all/${user_id}`, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          },
          withCredentials: true
    }).then((res) => {
        return res.data
    })
}