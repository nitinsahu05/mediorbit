import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#0f172a] md:mx-6'>
      <p className='text-xs font-extrabold tracking-[0.2em] text-[#0f766e] uppercase'>Featured Experts</p>
      <h1 className='text-3xl md:text-4xl font-extrabold text-center'>Doctors Patients Trust Most</h1>
      <p className='sm:w-2/3 text-center text-sm text-[#55657a]'>From family medicine to specialist care, choose from verified professionals with flexible schedules.</p>
      <div className='w-full grid grid-cols-auto gap-5 pt-5 gap-y-7 px-2 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='surface overflow-hidden cursor-pointer hover:translate-y-[-6px] transition-all duration-300 reveal-up' style={{ animationDelay: `${index * 40}ms` }} key={index}>
            <img className='bg-[#e5f3f2] aspect-[4/3] w-full object-cover' src={item.image} alt="" />
            <div className='p-4'>
              <div className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full ${item.available ? 'bg-[#e1f7ef] text-[#047857]' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-[#10b981]' : 'bg-[#94a3b8]'}`}></p><p>{item.available ? 'Available Now' : 'Next Slot Soon'}</p>
              </div>
              <p className='text-[#0f172a] text-lg font-extrabold mt-3'>{item.name}</p>
              <p className='text-[#55657a] text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='btn-ghost px-12 py-3 mt-10'>View all doctors</button>
    </div>

  )
}

export default TopDoctors
