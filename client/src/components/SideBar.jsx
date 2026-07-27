import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.webp'
import { IoIosSearch } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { BiLogOutCircle } from 'react-icons/bi'
import { serverUrl } from '../main'
import axios from 'axios'
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function SideBar() {
    let { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user)
    let [input, setInput] = useState('')
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    const handlesearch = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true })
            dispatch(setSearchData(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (input) {
            handlesearch()
        }
    }, [input])

    return (
        <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block relative ${!selectedUser ? 'block' : 'hidden'} bg-slate-950 text-slate-100 border-r border-slate-800`}>
            <div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-cyan-700 px-6 py-8 shadow-2xl shadow-slate-950/40'>
                <div className='pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),transparent_35%)]' />
                <div className='relative flex items-start justify-between gap-4'>
                    <div>
                        <p className='text-sm uppercase tracking-[0.3em] text-slate-300/70'>Chatly</p>
                        <h1 className='mt-4 text-3xl font-bold text-white'>Hello, {userData.name || 'Friend'}</h1>
                    </div>
                    <button className='grid h-14 w-14 place-items-center rounded-3xl border border-white/10 bg-white/10 text-white transition hover:bg-white/15' onClick={handleLogOut}>
                        <BiLogOutCircle className='w-6 h-6' />
                    </button>
                </div>
                <div className='mt-8 rounded-[32px] border border-white/10 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20'>
                    <div className='flex items-center gap-4'>
                        <div className='relative h-16 w-16 overflow-hidden rounded-full border border-cyan-400/40 bg-slate-800 shadow-lg'>
                            <img src={userData.image || dp} alt='' className='h-full w-full object-cover' />
                        </div>
                        <div>
                            <p className='text-sm text-slate-400'>Logged in as</p>
                            <p className='font-semibold text-white'>{userData.userName}</p>
                        </div>
                    </div>
                    <button className='mt-5 w-full rounded-3xl border border-cyan-400/40 bg-cyan-400/10 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15' onClick={() => navigate('/profile')}>
                        Edit profile
                    </button>
                </div>
            </div>

            <div className='px-6 py-6'>
                <div className='flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 shadow-lg shadow-slate-950/20'>
                    <IoIosSearch className='text-cyan-300' />
                    <input type='text' placeholder='Search users...' className='w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500' value={input} onChange={(e) => setInput(e.target.value)} />
                    {input && <RxCross2 className='cursor-pointer text-slate-400 hover:text-white' onClick={() => setInput('')} />}
                </div>
                <div className='mt-6 space-y-4'>
                    {input ? (
                        <div className='space-y-3 max-h-[360px] overflow-y-auto scrollbar-hidden'>
                            {searchData?.length ? searchData.map((user) => (
                                <button key={user._id} className='w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-4 text-left transition hover:border-cyan-400/50 hover:bg-slate-800' onClick={() => { dispatch(setSelectedUser(user)); setInput('') }}>
                                    <div className='flex items-center gap-4'>
                                        <div className='relative h-14 w-14 overflow-hidden rounded-full bg-slate-700'>
                                            <img src={user.image || dp} alt='' className='h-full w-full object-cover' />
                                            {onlineUsers?.includes(user._id) && <span className='absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950' />}
                                        </div>
                                        <div>
                                            <p className='font-semibold text-white'>{user.name || user.userName}</p>
                                            <p className='text-sm text-slate-400'>{user.email}</p>
                                        </div>
                                    </div>
                                </button>
                            )) : <p className='text-sm text-slate-500'>No matching users found.</p>}
                        </div>
                    ) : (
                        <div className='space-y-3'>
                            <h2 className='text-sm uppercase tracking-[0.3em] text-slate-500'>Online now</h2>
                            <div className='flex flex-wrap gap-3'>
                                {otherUsers?.filter((user) => onlineUsers?.includes(user._id)).map((user) => (
                                    <button key={user._id} type='button' className='flex min-w-[68px] flex-col items-center gap-2 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-4 text-center transition hover:border-cyan-400/50' onClick={() => { dispatch(setSelectedUser(user)); setSearch(false); setInput('') }}>
                                        <div className='relative h-14 w-14 overflow-hidden rounded-full bg-slate-700'>
                                            <img src={user.image || dp} alt='' className='h-full w-full object-cover' />
                                            <span className='absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950' />
                                        </div>
                                        <p className='text-xs text-slate-300'>{user.name || user.userName}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='px-6 pb-8'>
                <h2 className='mb-4 text-sm uppercase tracking-[0.3em] text-slate-500'>All users</h2>
                <div className='space-y-3 overflow-y-auto max-h-[44vh] scrollbar-hidden'>
                    {otherUsers?.map((user) => (
                        <button key={user._id} type='button' className='w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-4 text-left transition hover:border-cyan-400/50 hover:bg-slate-800' onClick={() => { dispatch(setSelectedUser(user)); setSearch(false); setInput('') }}>
                            <div className='flex items-center gap-4'>
                                <div className='relative h-14 w-14 overflow-hidden rounded-full bg-slate-700'>
                                    <img src={user.image || dp} alt='' className='h-full w-full object-cover' />
                                    {onlineUsers?.includes(user._id) && <span className='absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950' />}
                                </div>
                                <div>
                                    <p className='font-semibold text-white'>{user.name || user.userName}</p>
                                    <p className='text-sm text-slate-400'>{onlineUsers?.includes(user._id) ? 'Online' : 'Offline'}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideBar
