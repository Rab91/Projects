import React from 'react'
import '../../App.css'
import logo from '../../assets/logo3.png'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar background">
            <div className="container">
                <img className='img-responsive image'
                src={logo} alt="Logo" width="90" height="60"/>
            </div>
        </nav>
    </div>
  )
}

export default Navbar