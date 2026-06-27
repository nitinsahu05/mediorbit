import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="px-2 md:px-4">
      <div className="surface grid md:grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-24 text-sm items-start p-8 md:p-10">
        {/* Left Section */}
        <div className="flex items-start gap-4">
          <img className="w-14 h-14 rounded-full border border-[#d7e4e3]" src={assets.logo} alt="MediOrbit Logo" />
          <div>
            <p className='text-xs font-extrabold tracking-[0.18em] text-[#0f766e] uppercase'>MediOrbit</p>
            <p className="text-[#55657a] leading-6 md:max-w-[85%] mt-2">
              A modern appointment platform designed to connect patients and doctors faster, with smoother booking, profile clarity, and dependable reminders.
            </p>
          </div>
        </div>


        {/* Middle Section */}
        <div>
          <p className="text-base font-extrabold mb-4 text-[#0f172a]">Company</p>
          <ul className="flex flex-col gap-2 text-[#55657a]">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-base font-extrabold mb-4 text-[#0f172a]">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-[#55657a]">
            <li>+91-90000-90000</li>
            <li>customersupport@appointy.in</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <p className="py-4 text-sm text-center text-[#64748b]">
        © 2026 MediOrbit Health. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
