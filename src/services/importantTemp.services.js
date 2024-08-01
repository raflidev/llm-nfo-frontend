import axios from "axios"

export const postImportantTempURL = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/generation/terms/url`, data)
    return response
  } catch (error) {
    return error
  }
}

export const postImportantTempPDF = async (data) => {
  var formData = new FormData()
  formData.append('file', data.file)
  formData.append('conversation_id', data.conversation_id)
  console.log(formData.get('file'));
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/generation/terms/pdf`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const getImportantTempByConvID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/generation/terms/${id}`)
    return response
  } catch (error) {
    return error
  }
}