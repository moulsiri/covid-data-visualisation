import React from 'react'
import { NavLink } from 'react-router-dom'
const Navigation = () => {
  return (
    <nav className="navbar shadow-sm ps-5 pt-3 navbar-expand">
        {/* <a href="#" className="navbar-brand">COVID VISUALISATION</a> */}
        <ul className="navbar-nav">
            <li className="navbar-nav">
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
            </li>

        </ul>

    </nav>
  )
}

export default Navigation