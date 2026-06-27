import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Razorpay payment handler
  const initRazorpayPayment = async (appointmentId) => {
    try {
      // 1. Create order on backend
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      )

      if (!data.success) {
        return toast.error(data.message)
      }

      const order = data.order

      // 2. Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = resolve
          script.onerror = () => reject(new Error('Failed to load Razorpay SDK'))
          document.body.appendChild(script)
        })
      }

      // 3. Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'MediOrbit',
        description: 'Appointment Payment',
        order_id: order.id,
        handler: async (response) => {
          try {
            const { data: verifyData } = await axios.post(
              backendUrl + '/api/user/verify-razorpay',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { token } }
            )

            if (verifyData.success) {
              toast.success('Payment Successful!')
              getUserAppointments()
            } else {
              toast.error(verifyData.message)
            }
          } catch (err) {
            console.log(err)
            toast.error('Payment verification failed')
          }
        },
        prefill: {},
        theme: { color: '#0ea5e9' },
        modal: {
          ondismiss: () => toast.info('Payment cancelled'),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 text-2xl font-extrabold text-[#0f172a] border-b border-[#d7e4e3]'>My appointments</p>
      <div className=''>
        {appointments.map((item, index) => (
          <div key={index} className='surface grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 px-4 my-4'>
            <div>
              <img className='w-36 h-36 object-cover bg-[#EAEFFF] rounded-2xl' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-[#5b677a]'>
              <p className='text-[#0f172a] text-base font-extrabold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-[#334155] font-bold mt-1'>Address:</p>
              <p className=''>{item.docData.address.line1}</p>
              <p className=''>{item.docData.address.line2}</p>
              <p className=' mt-1'><span className='text-sm text-[#334155] font-bold'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => initRazorpayPayment(item._id)}
                  className='sm:min-w-48 py-2 border border-[#d7e4e3] rounded-full hover:bg-primary hover:text-white transition-all duration-300'
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border rounded-full text-[#0f172a] bg-[#dcf4f2] border-[#bce3df]'>
                  Appointment Confirmed
                </button>
              )}
              {item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded-full text-green-600'>
                  Completed
                </button>
              )}
              {!item.cancelled && !item.isCompleted && item.payment && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='sm:min-w-48 py-2 border border-[#fecaca] rounded-full text-[#b91c1c] hover:bg-red-600 hover:text-white transition-all duration-300'
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-red-400 rounded-full text-red-500'>
                  Appointment cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
