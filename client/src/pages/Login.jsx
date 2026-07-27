import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setSelectedUser, setUserData } from '../redux/userSlice'

function Login() {
    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")
    let dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                email, password
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            dispatch(setSelectedUser(null))
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error?.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className='min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10'>
            <div className='w-full max-w-[500px] rounded-[32px] overflow-hidden border border-white/10 bg-slate-900/90 shadow-[0_30px_90px_rgba(15,23,42,0.55)]'>
                <div className='relative bg-gradient-to-br from-sky-500 via-cyan-500 to-indigo-600 p-10'>
                    <div className='absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_35%)]' />
                    <h1 className='relative text-4xl font-extrabold text-white'>Welcome back</h1>
                    <p className='relative mt-3 text-sky-100/90'>Sign in to continue your conversations in Chatly.</p>
                </div>
                <form className='px-10 py-8 flex flex-col gap-5' onSubmit={handleLogin}>
                    <div className='space-y-3'>
                        <label className='text-sm font-semibold text-slate-300'>Email</label>
                        <input type='email' placeholder='Email address' className='w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-5 py-4 text-slate-100 shadow-lg shadow-sky-500/10 outline-none transition focus:border-cyan-400' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className='space-y-3'>
                        <div className='flex items-center justify-between text-sm font-semibold text-slate-300'>
                            <label>Password</label>
                            <button type='button' className='text-cyan-300' onClick={() => setShow(prev => !prev)}>{show ? 'Hide' : 'Show'}</button>
                        </div>
                        <input type={show ? 'text' : 'password'} placeholder='Password' className='w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-5 py-4 text-slate-100 shadow-lg shadow-sky-500/10 outline-none transition focus:border-cyan-400' onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    {err && <p className='text-sm text-rose-400'>{err}</p>}
                    <button className='mt-2 h-14 w-full rounded-3xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 text-lg font-semibold shadow-xl shadow-cyan-500/20 transition hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70' disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
                    <p className='text-center text-sm text-slate-400'>No account yet? <span className='cursor-pointer text-cyan-300 hover:text-cyan-200' onClick={() => navigate('/signup')}>Create one</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login
