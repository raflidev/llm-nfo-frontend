import axios from "axios";

export const loginAuth = async (data) => {
    return await axios.post(`${process.env.REACT_APP_API_URI}/login`, data).then((res) => {
        return res.data
    })
}