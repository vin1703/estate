import React, { Suspense, useContext, useEffect } from 'react'
import './profilePage.scss'
import { Await, Link, useLoaderData } from 'react-router-dom'
import List from '../../components/list/List'
import Chat from '../../components/chat/Chat'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
function ProfilePage() {
  const {updateUser,currentUser} = useContext(AuthContext)
  const data = useLoaderData();

  const navigate = useNavigate();
  const handleLogout = async()=>{
      updateUser(null);
      navigate('/');
  }
  return (
    <div className='profilePage'>
      <div className="details">
        <div className="wrapper">
            <div className="title">
                <h1>User Information</h1>
                <Link to='/profile/update'>
                <button>Update Profile</button>
                </Link>
                
            </div>
            <div className="info">
                <span>Avatar: <img src={currentUser?.userInfo?.avatar || 'noavatar.jpg' } alt="" /></span>
                <span>Username : <b>{currentUser?.userInfo.username}</b> </span>
                <span>E-mail : <b>{currentUser?.userInfo.email}</b>
                 </span>
                 <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="title">
                <h1>My List</h1>
                <Link to='/add'><button>Create New Post</button></Link>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading Posts!</p>}
            >
              {(postResponse)=><List posts={postResponse.data.userPosts}/>}
            </Await>
            </Suspense>
            <div className="title">
                <h1>Saved List</h1>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
            <Await 
            resolve={data.postResponse}
            errorElement={<p>Error Loading Posts!</p>}
            >
              {(postResponse)=><List posts={postResponse.data.savedPosts}/>}
            </Await>
            </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
            <Await 
            resolve={data.chatResponse}
            errorElement={<p>Error Loading Posts!</p>}
            >
              {(chatResponse)=><Chat chats={chatResponse.data}/>}
            </Await>
            </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
