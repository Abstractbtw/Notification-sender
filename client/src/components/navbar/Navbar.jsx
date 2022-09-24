import React from 'react'
import './navbar.css'
import {NavLink} from 'react-router-dom'


function Navbar() {

  const activeUser = localStorage.getItem('name')

  const clearUser = () => {
    localStorage.setItem('name', '')
    localStorage.setItem('email', '')
    document.location.reload()
  }

  return (
    <div className="navbar">
      <div className="nav_top">
        {!activeUser ? (
          <div className="nav_header">
            <NavLink to="/login"className="nav_log_out">Log In</NavLink>
            <div className="nav_ver_line">|</div>
            <NavLink to="/registration"className="nav_log_out">Registration</NavLink>
          </div>
        ) : (
          <div className="nav_header">
            <div className="nav_auth">Logged in as: {activeUser}</div>
            <div className="nav_ver_line">|</div>
            <button onClick={clearUser} className="nav_log_out" role="button"><span className="text">Log out</span></button>
          </div>
        )}
        <div className="nav_name">Notification sender</div>
        <div className="custom-shape-divider-bottom-1660104785">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
      </div>
    </div>
  )
}

export default Navbar