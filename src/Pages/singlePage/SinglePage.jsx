import React, { useContext, useEffect, useState } from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/Slider'
import Map from '../../components/map/Map'
// import {singlePostData ,userData } from '../../lib/dummydata'
import { Navigate, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import {AuthContext} from "../../context/AuthContext"
import  { userRequest } from '../../lib/apiRequest'

function SinglePage() {

  // console.log("inside ")
  const{ currentUser }= useContext(AuthContext)
  const navigate = useNavigate();
  // useEffect(()=>{
  //   console.log('inside')
  //   if(!currentUser.accessToken)navigate('/login');
  // },[navigate,currentUser])

  // console.log("tokens:"+ currentUser.accessToken);
  const singlePostData = useLoaderData();

  const [saved,setSaved] = useState(singlePostData.isSaved)
  
  const handleSave = async(e)=>{
    setSaved(prev=>!prev);
    if(!currentUser){
      redirect("/login");
    }
    try{
      const axiosInstance = userRequest(currentUser?.accessToken)
      await axiosInstance.post('/post/save',{postId:singlePostData.id});
    }catch(err){
      console.log(err);
    }
  }
  //handle chat func

  const handleOpenChat = async () => {
    try {
      const axiosInstance = userRequest(currentUser?.accessToken);
      const res = await axiosInstance.post('/chat',{receiverId:singlePostData.user.id});
      // console.log(res.data);
      if(res)navigate('/profile')
    } catch (err) {
      console.log(err);
    }
  };

  //ends
  console.log(singlePostData)
  return (
    currentUser ? <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>
              </div>
              <div className="user">
                <img src={singlePostData.user.avatar||'/noavatar.jpg'} alt="" />
                <span>{singlePostData.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(singlePostData.postDetail.desc)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{singlePostData.postDetail.utilities} is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets {singlePostData.postDetail.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{singlePostData.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{singlePostData.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{singlePostData.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{singlePostData.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{singlePostData.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{singlePostData.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{singlePostData.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>

          
          <div className="buttons">
            {currentUser.userInfo.id!==singlePostData.user.id && <button onClick={handleOpenChat}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>}
            <button onClick={handleSave} style={{backgroundColor:saved?"#fece51":"#fff"}}>
              <img src="/save.png" alt="" />
              {saved ?"Place Saved":"Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div> : Navigate('/login')
  )
}

export default SinglePage
