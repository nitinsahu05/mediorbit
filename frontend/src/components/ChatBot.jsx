import React, { useState, useRef, useEffect } from 'react'
import { WELCOME_MESSAGE, QUICK_SUGGESTIONS, BOT_NAME } from '../data/chatbotData.js'
import { getResponse, formatMessage } from '../utils/chatbotEngine.js'
import { assets } from '../assets/assets.js'

const TypingIndicator = () => (
  <div className='flex items-end gap-2 mb-3'>
    <div className='w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[#d7e4e3]'>
      <img src={assets.logo} className='w-full h-full object-cover' alt="MediBot" />
    </div>
    <div className='bg-white border border-[#d7e4e3] rounded-2xl rounded-bl-sm px-4 py-3'>
      <div className='flex gap-1 items-center h-4'>
        <span className='w-2 h-2 bg-teal-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }} />
        <span className='w-2 h-2 bg-teal-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }} />
        <span className='w-2 h-2 bg-teal-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
)

const Message = ({ msg }) => {
  const isBot = msg.sender === 'bot'
  return (
    <div className={`flex items-end gap-2 mb-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot ? (
        <div className='w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[#d7e4e3]'>
          <img src={assets.logo} className='w-full h-full object-cover' alt="MediBot" />
        </div>
      ) : (
        <div className='w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0'>
          U
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? 'bg-white border border-[#d7e4e3] rounded-2xl rounded-bl-sm text-[#0f172a]'
            : 'bg-gradient-to-br from-teal-600 to-cyan-500 text-white rounded-2xl rounded-br-sm'
        }`}
        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
      />
    </div>
  )
}

const ChatBot = ({ fullPage = false }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: WELCOME_MESSAGE }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text) => {
    const userText = text || input.trim()
    if (!userText) return

    setInput('')
    setShowSuggestions(false)

    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }])

    // Show typing indicator
    setIsTyping(true)

    // Simulate bot thinking delay
    setTimeout(() => {
      const botReply = getResponse(userText)
      setIsTyping(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply }])
    }, 800 + Math.random() * 400)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const containerClass = fullPage
    ? 'flex flex-col h-[70vh] max-h-[700px]'
    : 'flex flex-col h-full'

  return (
    <div className={containerClass}>
      {/* Messages area */}
      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-1'>
        {messages.map(msg => (
          <Message key={msg.id} msg={msg} />
        ))}
        {isTyping && <TypingIndicator />}

        {/* Quick suggestions */}
        {showSuggestions && !isTyping && (
          <div className='mt-3'>
            <p className='text-xs text-[#94a3b8] mb-2 ml-10'>Quick questions:</p>
            <div className='flex flex-wrap gap-2 ml-10'>
              {QUICK_SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className='text-xs px-3 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors'
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className='border-t border-[#d7e4e3] px-4 py-3 bg-white/80 backdrop-blur-sm'>
        <div className='flex gap-2 items-center'>
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type your health question...'
            className='flex-1 text-sm px-4 py-2.5 rounded-full border border-[#d7e4e3] bg-white outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all'
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className='w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-white flex items-center justify-center disabled:opacity-40 hover:shadow-lg transition-all flex-shrink-0'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
              <path d='M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z' />
            </svg>
          </button>
        </div>
        <p className='text-center text-[10px] text-[#94a3b8] mt-2'>
          ⚠️ MediBot provides general info only. Always consult a doctor.
        </p>
      </div>
    </div>
  )
}

export default ChatBot
