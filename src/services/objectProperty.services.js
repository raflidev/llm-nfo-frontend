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
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/generation/object-properties/${data.id}`, data)
    return response
  } catch (error) {
    console.log(error);
    
    return error
  }
}

export const deleteObjectPropertyByID = async (data) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URI}/generation/object-properties/${data.id}`, {
      data: {
        "object_properties_ids": data.data_properties_ids
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const deleteRangeByID = async (data) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URI}/generation/object-properties/${data.id}/range`, {
      data
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const deleteDomainByID = async (data) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URI}/generation/object-properties/${data.id}/domain`, {
      data
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    return error
  }
}