import React, {useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";


const Navbar = () => {
    const navigate = useNavigate();
    const [hiddenMenu, setHiddenMenu] = useState(false);
    const [open, setOpen] = useState(false);

    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setHiddenMenu(true)
            }else{
                setHiddenMenu(false)
            }
        })
    }, [auth])
    


    
  return (
    <nav className='p24'>
        <div className="left">
            <div className="logo" onClick={() => navigate("/")}>
                <img src="./logo.png" alt="" />
                <span>campusEase</span>
                
            </div>
        </div>

        <div className="right">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link  to="/profile" className='register'>{hiddenMenu ? "Profile" : <><FaSignInAlt/>Sign in</>}</Link>
            <Link to='/add-listing' className='plus'><FaPlus /> Add</Link>

            <div onClick={() => setOpen(prev => !prev)} className='menuBar'>
                <GiHamburgerMenu className='burger'/>
                {/* <img src="./menu.png" alt="" /> */}
            </div>
            <div className={open ? 'menu active' : 'menu'}>
            <Link to="/" onClick={() => setOpen(prev => !prev)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(prev => !prev)}>About</Link>
            <Link  to="/profile" onClick={() => setOpen(prev => !prev)} className='register'>{hiddenMenu ? "Profile" : <><FaSignInAlt/>Sign in</>}</Link>
            <Link to='/add-listing' onClick={() => setOpen(prev => !prev)} className='plus'><FaPlus /> Add</Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar