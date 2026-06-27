import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { assets } from './assets/assets'
import RelatedDoctors from './components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId)
    if (doc) {
      // Ensure slots_booked is always at least an empty object
      setDocInfo({ ...doc, slots_booked: doc.slots_booked || {} })
    }
  }

  const getAvailableSlots = () => {
    if (!docInfo) return
    setDocSlots([])

    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(slotTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {

    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      return toast.warning('Please select a time slot')
    }

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {
      // Step 1: Book appointment (unpaid)
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (!data.success) {
        return toast.error(data.message)
      }

      const appointmentId = data.appointmentId

      // Step 2: Create Razorpay order
      const { data: orderData } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      )

      if (!orderData.success) {
        return toast.error(orderData.message)
      }

      const order = orderData.order

      // Step 3: Load Razorpay SDK if needed
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = resolve
          script.onerror = () => reject(new Error('Failed to load Razorpay SDK'))
          document.body.appendChild(script)
        })
      }

      // Step 4: Open Razorpay checkout
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
              toast.success('Appointment Booked & Payment Successful!')
              getDoctorsData()
              navigate('/my-appointments')
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
          ondismiss: async () => {
            // Cancel appointment if user closes Razorpay without paying
            await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            toast.info('Payment cancelled. Appointment not booked.')
            getDoctorsData()
          },
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
    if (doctors.length > 0) {
      fetchDocInfo()
    }
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return (
    docInfo && (
      <div>
        {/* Doctor details */}
        <div className='flex flex-col sm:flex-row gap-5 mt-8'>
          <div>
            <img className='bg-[#dff2f1] w-full sm:max-w-80 rounded-3xl border border-[#cfe4e1]' src={docInfo.image} alt="" />
          </div>
          <div className='surface flex-1 p-8 py-7 mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-3xl font-extrabold text-[#0f172a]'>
              {docInfo.name} <img src={assets.verified_icon} alt="" />
            </p>
            <div className='flex items-center gap-2 mt-2 text-[#475569]'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-1 px-3 border border-[#cfe4e1] text-xs rounded-full bg-[#f4fbfa]'>{docInfo.experience}</button>
            </div>
            <div>
              <p className='flex items-center gap-1 text-sm font-bold text-[#0f172a] mt-4'>
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className='text-sm text-[#5b677a] max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
            <p className='text-[#475569] font-bold mt-4'>
              Appointment fee: <span className='text-[#0f172a]'>{currencySymbol} {docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className='sm:ml-80 sm:pl-5 mt-10 font-medium text-[#475569]'>
          <p className='font-extrabold text-[#0f172a]'>Booking slots</p>

          {/* Days Scroll */}
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-2xl cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#d7e4e3] bg-white'
                    }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Time Slots Scroll */}
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {docSlots.length > 0 &&
              docSlots[slotIndex] &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                      ? 'bg-primary text-white'
                      : 'text-[#64748b] border border-[#d7e4e3] bg-white'
                    }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            className='btn-solid text-sm px-20 py-3 my-6'
          >
            Proceed to Pay
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  )
}

export default Appointment
