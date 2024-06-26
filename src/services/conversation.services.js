import axios from "axios"

export const getConversationByUserId = async (user_id) => {
    return await axios.get(`${process.env.REACT_APP_API_URI}/conversation/all/${user_id}`, {
        withCredentials: true
    }).then((res) => {
        return res.data
    })
}

export const getConversationById = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API_URI}/conversation/${id}`, {
        withCredentials: true
    }).then((res) => {
        return res.data
    })
}

export const deleteConversationById = async (id) => {
    return await axios.delete(`${process.env.REACT_APP_API_URI}/conversation/${id}`, {
        withCredentials: true
    }).then((res) => {
        return res.data
    })
}