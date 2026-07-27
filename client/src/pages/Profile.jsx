import React, { useRef, useState } from 'react'
import dp from '../assets/dp.webp'
import { IoCameraOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../main'
import { setUserData } from '../redux/userSlice'

function Profile() {
    let { userData } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [name, setName] = useState(userData.name || "")
    let [frontendImage, setFrontendImage] = useState(userData.image || dp)
    let [backendImage, setBackendImage] = useState(null)
    let image = useRef()
    let [saving, setSaving] = useState(false)

    const handleImage = (e) => {
        let file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleProfile = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            let formData = new FormData()
            formData.append('name', name)
            if (backendImage) {
                formData.append('image', backendImage)
            }
            let result = await axios.put(`${serverUrl}/api/user/profile`, formData, { withCredentials: true })
            setSaving(false)
            dispatch(setUserData(result.data))
            navigate('/')
        } catch (error) {
            console.log(error)
            setSaving(false)
        }
    }

    return (
        <div className='min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10'>
            <div className='w-full max-w-[1000px] rounded-[32px] bg-slate-900/90 border border-white/10 shadow-[0_35px_100px_rgba(15,23,42,0.45)] overflow-hidden'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='relative flex-1 bg-slate-950/90 p-10 flex flex-col items-center justify-center gap-8 border-b border-slate-800 lg:border-b-0 lg:border-r lg:border-slate-800'>
                        <button className='absolute top-6 left-6 rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800' onClick={() => navigate('/')}>Back to chat</button>
                        <div className='relative w-[220px] h-[220px] rounded-full overflow-hidden border-8 border-cyan-400 shadow-[0_20px_60px_rgba(14,165,233,0.24)] cursor-pointer' onClick={() => image.current.click()}>
                            <img src={frontendImage} alt='' className='h-full w-full object-cover' />
                            <div className='absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg'>
                                <IoCameraOutline className='w-6 h-6' />
                            </div>
                        </div>
                        <div className='text-center'>
                            <p className='text-sm uppercase tracking-[0.3em] text-cyan-300/80'>Profile</p>
                            <h1 className='mt-2 text-3xl font-bold text-white'>{userData.name || 'Your Name'}</h1>
                            <p className='mt-2 text-sm text-slate-400'>{userData?.email}</p>
                        </div>
                    </div>
                    <form className='flex-1 p-8 md:p-10 space-y-6' onSubmit={handleProfile}>
                        <input type='file' accept='image/*' ref={image} hidden onChange={handleImage} />
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-slate-300'>Display Name</label>
                            <input type='text' placeholder='Enter your name' className='w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-slate-100 shadow-lg shadow-sky-500/10 outline-none transition focus:border-cyan-400' onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-slate-300'>Username</label>
                            <input type='text' readOnly className='w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-slate-400 shadow-lg shadow-sky-500/10' value={userData?.userName} />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-slate-300'>Email</label>
                            <input type='email' readOnly className='w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-slate-400 shadow-lg shadow-sky-500/10' value={userData?.email} />
                        </div>
                        <button className='mt-2 h-14 w-full rounded-3xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 text-lg font-semibold shadow-xl shadow-cyan-500/20 transition hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70' disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
