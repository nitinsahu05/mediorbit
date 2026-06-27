import React from 'react'
import ChatBot from '../components/ChatBot'
import { assets } from '../assets/assets'

const Chat = () => {
  return (
    <div className='mt-10 mb-16'>
      {/* Header */}
      <div className='text-center mb-8'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden mb-4 shadow-lg'>
          <img src={assets.logo} className='w-full h-full object-cover' alt="MediOrbit Logo" />
        </div>
        <h1 className='text-3xl font-extrabold text-[#0f172a]'>MediBot</h1>
        <p className='text-[#5b677a] mt-2 max-w-md mx-auto'>
          Your 24/7 AI health assistant. Ask about symptoms, medications, specialists, or how to book an appointment.
        </p>
        <div className='flex items-center justify-center gap-2 mt-3'>
          <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
          <span className='text-sm text-green-600 font-medium'>Online — Ready to help</span>
        </div>
      </div>

      {/* Chat window */}
      <div className='max-w-2xl mx-auto surface shadow-xl overflow-hidden'>
        {/* Chat header bar */}
        <div className='bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-6 py-4 flex items-center gap-3'>
          <img src={assets.logo} className='w-10 h-10 rounded-full object-cover bg-white' alt="MediOrbit Logo" />
          <div>
            <p className='font-bold'>MediBot Health Assistant</p>
            <p className='text-xs opacity-90'>Powered by MediOrbit</p>
          </div>
        </div>

        {/* Chat component */}
        <ChatBot fullPage={true} />
      </div>

      {/* Disclaimer */}
      <p className='text-center text-xs text-[#94a3b8] mt-6 max-w-lg mx-auto'>
        ⚠️ MediBot provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
      </p>
    </div>
  )
}

export default Chat
