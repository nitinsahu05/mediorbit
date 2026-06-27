import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'



const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='pt-8 pb-8'>
      <p className='text-3xl md:text-4xl font-extrabold text-[#0f172a]'>Find A Specialist</p>
      <p className='text-[#5b677a] mt-2'>Browse by speciality and book in the next available slot.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-6'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-2 px-4 border rounded-full text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white border-primary' : 'bg-white border-[#d7e4e3]'}`}>Filters</button>
        <div className={`surface p-4 flex-col gap-3 text-sm text-[#475569] min-w-[230px] ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[90vw] sm:w-auto pl-3 py-2 pr-8 border rounded-full transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-[#dcf4f2] text-[#0f172a] border-[#bce3df]' : 'border-[#d7e4e3]'}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[90vw] sm:w-auto pl-3 py-2 pr-8 border rounded-full transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-[#dcf4f2] text-[#0f172a] border-[#bce3df]' : 'border-[#d7e4e3]'}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[90vw] sm:w-auto pl-3 py-2 pr-8 border rounded-full transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-[#dcf4f2] text-[#0f172a] border-[#bce3df]' : 'border-[#d7e4e3]'}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[90vw] sm:w-auto pl-3 py-2 pr-8 border rounded-full transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-[#dcf4f2] text-[#0f172a] border-[#bce3df]' : 'border-[#d7e4e3]'}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[90vw] sm:w-auto pl-3 py-2 pr-8 border rounded-full transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-[#dcf4f2] text-[#0f172a] border-[#bce3df]' : 'border-[#d7e4e3]'}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[90vw] sm:w-auto pl-3 py-2 pr-8 border rounded-full transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-[#dcf4f2] text-[#0f172a] border-[#bce3df]' : 'border-[#d7e4e3]'}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-5 gap-y-7'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='surface overflow-hidden cursor-pointer hover:translate-y-[-6px] transition-all duration-300 reveal-up' style={{ animationDelay: `${index * 40}ms` }} key={index}>
              <img className='bg-[#e5f3f2] aspect-[4/3] w-full object-cover' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full ${item.available ? 'bg-[#e1f7ef] text-[#047857]' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-[#10b981]' : 'bg-[#94a3b8]'}`}></p><p>{item.available ? 'Available Now' : 'Next Slot Soon'}</p>
                </div>
                <p className='text-[#0f172a] text-lg font-extrabold mt-3'>{item.name}</p>
                <p className='text-[#5b677a] text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
