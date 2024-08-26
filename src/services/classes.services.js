import axios from "axios"

export const getClassesByConvID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/generation/classes/${id}`)
    return response
  } catch (error) {
    return error
  }
}
export const postSaveClassesByClassesID = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/generation/classes/${data.id}`, data
    )
    return response
  } catch (error) {
    console.log(error);
    
    return error
  }
}

export const getClassesAndDataPropertiesByConvID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/generation/classes-and-properties/${id}`)
    return response
  } catch (error) {
    return error
  }
}

export const deleteClasses = async (data) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URI}/generation/classes`, {data})
    
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}