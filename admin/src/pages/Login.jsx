import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
  const navigate = useNavigate()

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!backendUrl) {
      toast.error('Backend URL not configured.')
      return
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email: normalizedEmail, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message || 'Admin login failed')
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email: normalizedEmail, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          navigate('/doctor-dashboard')
        } else {
          toast.error(data.message || 'Doctor login failed')
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message || 'Login request failed')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <div className='flex items-center gap-2 m-auto mb-2'>
          <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg overflow-hidden'>
            <img src='/fabicon_logo.png' className='w-full h-full object-cover' alt='logo' onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerText='M' }} />
          </div>
          <div>
            <p className='text-xs tracking-widest uppercase text-gray-400'>Care Platform</p>
            <p className='font-extrabold text-[#0f172a] leading-4'>MediOrbit</p>
          </div>
        </div>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {state === 'Doctor' && (
          <p className='text-xs text-gray-500 mt-2'>
            Default doctor credentials: <span className='font-semibold'>doctor@mediorbit.com</span> / <span className='font-semibold'>Doctor1234</span>
          </p>
        )}
        {
          state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login