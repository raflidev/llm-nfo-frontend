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

export const postSaveInstancesClassesByClassID = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/generation/classes/instance/${data.id}`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'charset': 'utf-8'
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const deleteInstancesClassesByClassID = async (data) => {
  console.log(data);
  
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URI}/generation/classes/instance/${data.id}`, {
      data: {
        "instances_ids": data.instances_ids
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response
  } catch (error) {
    return error
  }
}