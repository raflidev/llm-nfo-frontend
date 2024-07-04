import axios from "axios"

export const postImportantTempURL = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/terms_extractor/url`, data)
    return response
  } catch (error) {
    return error
  }
}