import React, { useState } from 'react'
import ChatBot from './ChatBot'
import { assets } from '../assets/assets'

const ChatBotFloating = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating chat window */}
      {isOpen && (
        <div className='fixed bottom-24 right-6 w-[380px] h-[550px] surface shadow-2xl z-50 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300'>
          {/* Header */}
          <div className='bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-4 py-3 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img src={assets.logo} className='w-8 h-8 rounded-full object-cover bg-white' alt="MediOrbit Logo" />
              <div>
                <p className='font-bold text-sm'>MediBot</p>
                <p className='text-xs opacity-90'>Your Health Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                <path fillRule='evenodd' d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z' clipRule='evenodd' />
              </svg>
            </button>
          </div>

          {/* Chat content */}
          <ChatBot />
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-2xl hover:shadow-teal-500/50 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group'
        aria-label='Open chat'
      >
        {isOpen ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
            <path fillRule='evenodd' d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z' clipRule='evenodd' />
          </svg>
        ) : (
          <>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <path fillRule='evenodd' d='M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z' clipRule='evenodd' />
            </svg>
            {/* Pulse indicator */}
            <span className='absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-ping' />
            <span className='absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full' />
          </>
        )}
      </button>
    </>
  )
}

export default ChatBotFloating
