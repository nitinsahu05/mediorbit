import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='sticky top-0 z-40 pt-4'>
      <div className='surface flex items-center justify-between text-sm px-4 md:px-6 py-3'>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>        
        <img src={assets.logo} className='w-12 h-12 rounded-full object-cover' alt="MediOrbit Logo" />
        <div>
          <p className='text-xs tracking-[0.2em] uppercase text-[#4b5a67]'>Care Platform</p>
          <p className='text-base font-extrabold text-[#0f172a] leading-4'>MediOrbit</p>
        </div>
      </div>

      <ul className='hidden md:flex items-start gap-7 font-bold text-[#334155]'>
        <li className='pb-0.5'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'text-[#0f766e]' : 'hover:text-[#0f766e]'}>HOME</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-[#0f766e]' : 'hover:text-[#0f766e]'}>DOCTORS</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'text-[#0f766e]' : 'hover:text-[#0f766e]'}>ABOUT</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-[#0f766e]' : 'hover:text-[#0f766e]'}>CONTACT</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/chat' className={({ isActive }) => isActive ? 'text-[#0f766e]' : 'hover:text-[#0f766e]'}>CHAT</NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-4'>

        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            {userData.image && userData.image.startsWith('http') ? (
              <img className='w-12 h-12 rounded-full object-cover border border-[#d7e4e3]' src={userData.image} alt="profile"
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
              />
            ) : null}
            <div
              className='w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white font-bold flex items-center justify-center text-lg border border-[#d7e4e3]'
              style={{ display: (userData.image && userData.image.startsWith('http')) ? 'none' : 'flex' }}
            >
              {userData.name ? userData.name[0].toUpperCase() : 'U'}
            </div>
            <img className='w-2.5' src={assets.dropdown_icon} alt="dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-white border border-[#d7e4e3] rounded-2xl shadow-xl flex flex-col gap-3 p-4'>
                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='btn-solid px-6 py-2.5 hidden md:block'
          >
            Create Account
          </button>
        )}

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-[#f8fafc] transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <div className='flex items-center gap-3'>
              <img src={assets.logo} className='w-10 h-10 rounded-full' alt="" />
              <p className='font-extrabold text-[#0f172a]'>MediOrbit</p>
            </div>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-3 mt-5 px-5 text-lg font-semibold'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-6 py-2 rounded-full inline-block bg-white border border-[#d7e4e3]'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-6 py-2 rounded-full inline-block bg-white border border-[#d7e4e3]'>DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-6 py-2 rounded-full inline-block bg-white border border-[#d7e4e3]'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-6 py-2 rounded-full inline-block bg-white border border-[#d7e4e3]'>CONTACT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/chat' ><p className='px-6 py-2 rounded-full inline-block bg-white border border-[#d7e4e3]'>CHAT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
