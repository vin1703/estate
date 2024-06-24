import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// console.log(SERVER_URL)
const apiRequest = axios.create({
    baseURL : `${SERVER_URL}/api`,
    withCredentials:true,
})

export default apiRequest;