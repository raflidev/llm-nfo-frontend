import axios from 'axios';

export const getInstancesClasses = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/generation/instances-of-classes`, {
      "conversation_id": data
    }, {
      withCredentials: true
    })
    return response
  } catch (error) {
    return error
  }
};

export const getInstancesClassesByConvID = async (data) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/generation/classes/${data}/instance`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    return error
  }
};

// https://ontology-api.hidayattaufiqur.dev/generation/classes/instance/:class_id
export const postSaveInstancesClassesByClassID = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/generation/classes/instance/${data.id}`, data, {
      withCredentials: true
    })
    return response
  } catch (error) {
    return error
  }
}