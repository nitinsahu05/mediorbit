import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            // If URL provided, update image via URL
            if (imageUrl.trim()) {
                formData.append('imageUrl', imageUrl.trim())
            } else if (image) {
                formData.append('image', image)
            }

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
                setImageUrl('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='surface max-w-2xl flex flex-col gap-3 text-sm pt-6 p-6 md:p-8 mt-8'>

            {isEdit ? (
                <div className='flex flex-col gap-3'>
                    <div className='inline-block relative'>
                        <img
                            className='w-36 h-36 object-cover rounded-2xl border border-[#d7e4e3]'
                            src={imageUrl.trim() ? imageUrl.trim() : (image ? URL.createObjectURL(image) : userData.image)}
                            alt=""
                            onError={(e) => { e.target.src = userData.image }}
                        />
                    </div>
                    {/* URL input */}
                    <div className='max-w-sm'>
                        <p className='text-xs text-[#475569] mb-1 font-medium'>Photo URL se lagao:</p>
                        <input
                            type='text'
                            placeholder='https://example.com/photo.jpg'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className='w-full bg-white border border-[#d7e4e3] rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100'
                        />
                    </div>
                </div>
            ) : (
                <img className='w-36 h-36 object-cover rounded-2xl border border-[#d7e4e3]' src={userData.image} alt="" />
            )}

            {isEdit ? (
                <input className='bg-white border border-[#d7e4e3] rounded-xl px-3 py-2 text-3xl font-extrabold text-[#0f172a] max-w-80' type="text"
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    value={userData.name}
                />
            ) : (
                <p className='font-extrabold text-3xl text-[#0f172a] mt-3'>{userData.name}</p>
            )}

            <hr className='bg-[#d7e4e3] h-[1px] border-none' />

            <div>
                <p className='text-[#475569] underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#334155]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>

                    <p className='font-medium'>Phone:</p>
                    {isEdit ? (
                        <input className='bg-white border border-[#d7e4e3] rounded-lg px-2 py-1 max-w-52' type="text"
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                            value={userData.phone}
                        />
                    ) : (
                        <p className='text-blue-500'>{userData.phone}</p>
                    )}

                    <p className='font-medium'>Address:</p>
                    {isEdit ? (
                        <p>
                            <input className='bg-white border border-[#d7e4e3] rounded-lg px-2 py-1' type="text"
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: { ...(prev.address || {}), line1: e.target.value }
                                }))}
                                value={userData.address?.line1 || ''}
                            />
                            <br />
                            <input className='bg-white border border-[#d7e4e3] rounded-lg px-2 py-1 mt-2' type="text"
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: { ...(prev.address || {}), line2: e.target.value }
                                }))}
                                value={userData.address?.line2 || ''}
                            />
                        </p>
                    ) : (
                        <p className='text-[#5b677a]'>{userData.address?.line1} <br /> {userData.address?.line2}</p>
                    )}
                </div>
            </div>

            <div>
                <p className='text-[#475569] underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#334155]'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit ? (
                        <select className='max-w-28 bg-white border border-[#d7e4e3] rounded-lg px-2 py-1'
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                            value={userData.gender}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className='text-[#5b677a]'>{userData.gender}</p>
                    )}

                    <p className='font-medium'>Birthday:</p>
                    {isEdit ? (
                        <input className='max-w-36 bg-white border border-[#d7e4e3] rounded-lg px-2 py-1' type='date'
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                            value={userData.dob}
                        />
                    ) : (
                        <p className='text-[#5b677a]'>{userData.dob}</p>
                    )}
                </div>
            </div>

            <div className='mt-10'>
                {isEdit ? (
                    <button onClick={updateUserProfileData} className='btn-solid px-8 py-2'>
                        Save information
                    </button>
                ) : (
                    <button onClick={() => setIsEdit(true)} className='btn-ghost px-8 py-2 hover:bg-primary hover:text-white'>
                        Edit
                    </button>
                )}
            </div>
        </div>
    ) : null
}

export default MyProfile
