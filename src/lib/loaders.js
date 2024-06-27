import { defer } from "react-router-dom";
import { publicRequest,userRequest } from "./apiRequest"




export const singlePageLoader = async ({request,params}) =>{
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    // console.log("token:"+token);
    const axiosInstance = userRequest(token)
    const res = await axiosInstance.get('/post/'+params.id)
    return res.data;
}

export const listPageLoader = async ({request,params}) =>{
    const query = request.url.split("?")[1];
    const postPromise = publicRequest.get('/post?'+query);
    return defer({
        postResponse : postPromise,
    });
    
}

export const  profilePageLoader = async()=>{
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    // console.log("token:"+token);
    if(!token)return;
    const axiosInstance = userRequest(token)
    const postPromise = axiosInstance.get("/user/profilePosts")
    const chatPromise = axiosInstance.get("/chat")
    return defer({
        postResponse : postPromise,
        chatResponse : chatPromise
    });
};