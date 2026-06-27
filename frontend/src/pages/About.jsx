import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#5b677a]'>
        <p>ABOUT <span className='text-[#0f172a] font-extrabold'>US</span></p>
      </div>

      <div className='surface my-10 p-6 md:p-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px] rounded-2xl border border-[#d7e4e3]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-[#5b677a]'>
          <p>Welcome to MediOrbit, your trusted partner in managing your healthcare needs conveniently and efficiently. At MediOrbit, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>MediOrbit is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediOrbit is here to support you every step of the way.</p>
          <b className='text-[#0f172a]'>Our Vision</b>
          <p>Our vision at MediOrbit is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className='text-xl my-4 text-[#5b677a]'>
        <p>WHY <span className='text-[#0f172a] font-extrabold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4'>
        <div className='surface px-10 md:px-10 py-8 sm:py-12 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-[#5b677a] cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='surface px-10 md:px-10 py-8 sm:py-12 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-[#5b677a] cursor-pointer'>
          <b>CONVENIENCE: </b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='surface px-10 md:px-10 py-8 sm:py-12 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-[#5b677a] cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About
