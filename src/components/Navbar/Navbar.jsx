import React, { useContext, useState } from 'react'
import './navbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
function Navbar() {
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)
  
  return (
    <nav>
        <div className="left">
          <a href="/" className='logo'>
            <img src="/logo.png" alt="" />
            <span>RealEstate</span>
          </a>
          <Link to='/'>Home</Link>
          <Link to='/list'>Properties</Link>
        </div>
        <div  className="right">
          {currentUser ? <div className="user">
            <img style={{cursor:'pointer'}} onClick={()=>navigate('/profile')} src={currentUser?.userInfo.avatar || '/noavatar.jpg'} alt="" />
            <span>{currentUser?.username}</span>
            <Link to='/profile' className='profile'>
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>:
          <>
          <Link style={{zIndex:"999"}} to="/login">Sign In</Link>
          <Link style={{zIndex:"999",color:"white"}} to="/register" className='register' >Sign Up</Link></>}
          <div style={{zIndex:"1000"}} className="menuIcon">
            <img src="/menu.png" alt="" onClick={()=>setOpen(prev=>!prev)} />
          </div>
          <div className={open ? "menu active":"menu"}>
          <Link to="/">Home</Link>
          <Link to="/list">Properties</Link>
          </div>
        </div>
    </nav>
  )
}

export default Navbar
