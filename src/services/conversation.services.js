import axios from "axios"

export const getConversationByUserId = async (user_id) => {
    return await axios.get(`${process.env.REACT_APP_API_URI}/conversations/users/${user_id}`, {
        withCredentials: true,
    }).then((res) => {
        return res.data
    })
}

export const getConversationById = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API_URI}/conversations/${id}`, {
        withCredentials: true
    }).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err);
        // return err.response.data
        
    })
}

export const deleteConversationById = async (id) => {
    return await axios.delete(`${process.env.REACT_APP_API_URI}/conversations/${id}`, {
        withCredentials: true
    }).then((res) => {
        return res.data
    })
}

// https://ontology-api.hidayattaufiqur.dev/generation/ontology/:conversation_id/existing-ontologies
export const createExistingOntology = async (data) => {
    return await axios.post(`${process.env.REACT_APP_API_URI}/generation/ontology/${data.conversation_id}/existing-ontologies`, data, {
        withCredentials: true
    }).then((res) => {
        return res.data
    })
}