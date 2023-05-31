import axios from "axios"

const BASEURL = import.meta.env.VITE_BASEURL

export const UserRegister = async (user) => {
    try {
        const { data } = await axios.post(`${BASEURL}/auth/register`, user)
        return data
    } catch (error) {
        console.log("Error while calling api", error);
        return error.response.data
    }
}