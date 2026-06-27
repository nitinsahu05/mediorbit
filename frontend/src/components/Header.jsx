import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='surface reveal-up mt-6 flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-14 overflow-hidden'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[8vw]'>
                <p className='text-xs font-extrabold tracking-[0.2em] text-[#0f766e] uppercase'>Fast and human care</p>
                <p className='text-3xl md:text-4xl lg:text-5xl text-[#0f172a] font-extrabold leading-tight'>
                    Find Your Right Doctor <br /> And Book in Minutes
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-[#435367] text-sm'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Search by speciality, compare profiles, and reserve your slot with transparent fees and instant confirmation.</p>
                </div>
                <div className='flex items-center gap-3'>
                    <a href='#speciality' className='btn-solid flex items-center gap-2 px-7 py-3 text-sm'>
                        Explore Specialities <img className='w-3' src={assets.arrow_icon} alt="" />
                    </a>
                    <p className='text-sm text-[#607084]'>24/7 booking assistance</p>
                </div>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative flex items-end justify-center'>
                <div className='absolute inset-0 bg-gradient-to-tr from-[#d7f0ee] to-[#fff1dc] rounded-3xl blur-2xl opacity-70'></div>
                <img className='w-full md:w-[90%] relative h-auto rounded-3xl' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header