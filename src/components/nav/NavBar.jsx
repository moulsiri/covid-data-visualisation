import React from 'react'
import './NavBar.scss'
const NavBar = () => {
  return (
    <nav>
    <i className="ri-menu-line" id="menu"></i>
    <div className="nlogo">
       <h1>covid-data</h1>
       <h2>VISUALISATION</h2>
    </div>
    <div className="nlinks">
       <a href="#">HOME</a>
       <a href="#">COUNTRY</a>
       <a href="#">GUIDLINES</a>
       <a href="#">RESOURCES</a>
       <a href="#">SUPPORT</a>
       <a href="#">HELP</a>
    </div>
     <div className="nIcons">
       <i className="ri-facebook-circle-fill"></i>
       <i className="ri-instagram-line"></i>
       <i className="ri-twitter-fill"></i>

     </div>
 </nav>
  )
}

export default NavBar