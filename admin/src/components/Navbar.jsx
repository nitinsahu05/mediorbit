import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const goToUserPanel = () => {
    window.location.href = 'http://localhost:5173/'
  }

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-3 text-xs'>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-2 cursor-pointer'
        >
          <img
            className='w-10 h-10 rounded-full object-cover'
            src={assets.admin_logo}
            alt="Logo"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div>
            <p className='text-[10px] tracking-[0.2em] uppercase text-[#4b5a67]'>Care Platform</p>
            <p className='text-sm font-extrabold text-[#0f172a] leading-4'>MediOrbit</p>
          </div>
        </div>

        {/* Role Label */}
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>

      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className='bg-primary text-white text-sm px-10 py-2 rounded-full'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
