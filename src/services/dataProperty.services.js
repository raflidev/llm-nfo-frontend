import axios from "axios"

export const getdataPropertyByConvID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/generation/data-properties/${id}`)
    return response
  } catch (error) {
    return error
  }
}

export const postSavedataPropertyByConvID = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/generation/data-properties/${data.id}`, data)
    return response
  } catch (error) {
    return error
  }
}
