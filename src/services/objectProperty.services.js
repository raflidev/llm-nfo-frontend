import axios from "axios"

export const getObjectPropertiesByConvID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/generation/object-properties/${id}`)
    return response
  } catch (error) {
    return error
  }
}

export const postSaveObjectPropertiesByConvID = async (data) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URI}/generation/object-properties/${data.id}`, data)
    return response
  } catch (error) {
    return error
  }
}