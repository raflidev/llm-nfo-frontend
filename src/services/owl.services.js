import axios from "axios"

// https://ontology-api.hidayattaufiqur.dev/generation/ontololgy/:conversation_id

export const getOntologyByConvID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/generation/ontololgy/${id}`)
    return response
  } catch (error) {
    return error
  }
}