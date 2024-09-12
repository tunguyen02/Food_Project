import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="logo">
                <h2>Food</h2>
                <p>Admin Panel</p>
            </div>
            <img className='profile' src={assets.profile_image} />
        </div>
    )
}

export default Navbar