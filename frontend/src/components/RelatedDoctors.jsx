import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#0f172a]'>
      <h1 className='text-3xl font-extrabold'>Related Doctors</h1>
      <p className='sm:w-1/2 text-center text-sm text-[#5b677a]'>Doctors from the same speciality you can book right away.</p>
      <div className='w-full grid grid-cols-auto gap-5 pt-5 gap-y-7 px-2 sm:px-0'>
        {relDoc.map((item, index) => (
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
      {/* <button className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
    </div>
  )
}

export default RelatedDoctors
