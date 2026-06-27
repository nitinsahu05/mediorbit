import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#5b677a]'>
        <p>CONTACT <span className='text-[#0f172a] font-extrabold'>US</span></p>
      </div>

      <div className='surface my-10 p-6 md:p-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-2xl border border-[#d7e4e3]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-extrabold text-lg text-[#0f172a]'>OUR OFFICE</p>
          <p className='text-[#5b677a]'>Rohini,Sector-25 <br /> Indrapuram,Ghaziabad,India</p>
          <p className='text-[#5b677a]'>Tel: +91 120 456 7890 <br /> Email: customersupport@appointy.in</p>
          <p className='font-extrabold text-lg text-[#0f172a]'>CAREERS AT APPOINTY</p>
          <p className='text-[#5b677a]'>Learn more about our teams and job openings.</p>
        </div>
      </div>

    </div>
  )
}

export default Contact
