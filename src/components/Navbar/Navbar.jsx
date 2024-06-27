import React, { useContext, useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
function Navbar() {
  const [open,setOpen] = useState(false);
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
            <img src={currentUser?.userInfo.avatar || '/noavatar.jpg'} alt="" />
            <span>{currentUser?.username}</span>
            <Link to='/profile' className='profile'>
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>:
          <>
          <Link style={{zIndex:"999"}} to="/login">Sign In</Link>
          <Link style={{zIndex:"999"}} to="/register" className='register' >Sign Up</Link></>}
          <div className="menuIcon">
            <img src="/menu.png" alt="" onClick={()=>setOpen(prev=>!prev)} />
          </div>
          <div className={open ? "menu active":"menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign In</a>
          <a href="/">Sign Up</a>
          </div>
        </div>
    </nav>
  )
}

export default Navbar
