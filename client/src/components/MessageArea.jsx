import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import dp from '../assets/dp.webp'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { FaImages } from 'react-icons/fa6'
import { RiSendPlane2Fill } from 'react-icons/ri'
import EmojiPicker from 'emoji-picker-react'
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import axios from 'axios'
import { serverUrl } from '../main'
import { setMessages } from '../redux/messageSlice'

function MessageArea() {
  let { selectedUser, userData, socket } = useSelector(state => state.user)
  let dispatch = useDispatch()
  let [showPicker, setShowPicker] = useState(false)
  let [input, setInput] = useState('')
  let [frontendImage, setFrontendImage] = useState(null)
  let [backendImage, setBackendImage] = useState(null)
  let image = useRef()
  let { messages } = useSelector(state => state.message)
  const handleImage = (e) => {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (input.length === 0 && backendImage == null) {
      return
    }
    try {
      let formData = new FormData()
      formData.append('message', input)
      if (backendImage) {
        formData.append('image', backendImage)
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, { withCredentials: true })
      dispatch(setMessages([...(messages || []), result.data]))
      setInput('')
      setFrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error)
    }
  }

  const onEmojiClick = (emojiData) => {
    setInput(prevInput => prevInput + emojiData.emoji)
    setShowPicker(false)
  }

  useEffect(() => {
    socket?.on('newMessage', (mess) => {
      dispatch(setMessages([...(messages || []), mess]))
    })
    return () => socket?.off('newMessage')
  }, [messages, socket, dispatch])

  return (
    <div className={`lg:w-[70%] relative ${selectedUser ? 'flex' : 'hidden'} lg:flex w-full h-full bg-slate-950 border-l border-slate-800 overflow-hidden`}>
      {selectedUser ? (
        <>
          <div className='w-full h-full flex flex-col overflow-hidden'>
            <div className='flex h-[110px] items-center justify-between gap-4 bg-slate-900/90 px-6 shadow-xl shadow-slate-950/30'>
              <button className='rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-slate-100 transition hover:bg-slate-900' onClick={() => dispatch(setSelectedUser(null))}>
                <IoIosArrowRoundBack className='w-6 h-6' />
              </button>
              <div className='flex items-center gap-4'>
                <div className='h-14 w-14 overflow-hidden rounded-full border-2 border-cyan-400 bg-slate-800'>
                  <img src={selectedUser?.image || dp} alt='' className='h-full w-full object-cover' />
                </div>
                <div>
                  <p className='text-sm text-slate-400'>Chatting with</p>
                  <h1 className='text-xl font-semibold text-white'>{selectedUser?.name || 'User'}</h1>
                </div>
              </div>
            </div>

            <div className='flex-1 overflow-hidden'>
              <div className='h-full overflow-y-auto px-6 py-8 space-y-6 scrollbar-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_40%),linear-gradient(180deg,#0f172a,#020617)]'>
                {messages?.map((mess, index) => (
                  mess.sender === userData._id ? <SenderMessage key={index} image={mess.image} message={mess.message} /> : <ReceiverMessage key={index} image={mess.image} message={mess.message} />
                ))}
              </div>
            </div>
          </div>
          <div className='w-full lg:w-[70%] fixed bottom-6 flex items-center justify-center px-4'>
            {frontendImage && <img src={frontendImage} alt='' className='absolute right-16 bottom-20 h-[90px] w-[90px] rounded-3xl object-cover shadow-2xl shadow-slate-950/40' />}
            <form className='relative flex w-full max-w-[900px] items-center gap-4 rounded-full bg-slate-900/90 px-5 py-4 shadow-2xl shadow-slate-950/40' onSubmit={handleSendMessage}>
              <button type='button' className='rounded-full bg-slate-950/90 p-3 text-cyan-300 transition hover:bg-slate-900' onClick={() => setShowPicker(prev => !prev)}>
                <RiEmojiStickerLine className='w-5 h-5' />
              </button>
              <input type='file' accept='image/*' ref={image} hidden onChange={handleImage} />
              <button type='button' className='rounded-full bg-slate-950/90 p-3 text-cyan-300 transition hover:bg-slate-900' onClick={() => image.current.click()}>
                <FaImages className='w-5 h-5' />
              </button>
              <input type='text' className='flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-500' placeholder='Write a message...' onChange={(e) => setInput(e.target.value)} value={input} />
              <button type='submit' className='flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60' disabled={!input && !backendImage}>
                <RiSendPlane2Fill className='w-5 h-5' />
              </button>
              {showPicker && <div className='absolute bottom-20 left-6 z-50'><EmojiPicker width={280} height={360} className='rounded-3xl shadow-2xl shadow-slate-950/40' onEmojiClick={onEmojiClick} /></div>}
            </form>
          </div>
        </>
      ) : (
        <div className='w-full h-full flex flex-col justify-center items-center px-6 text-center'>
          <h1 className='text-5xl font-extrabold text-white'>Welcome to Chatly</h1>
          <p className='mt-4 max-w-xl text-lg text-slate-400'>Choose a user to start a secure, instant conversation with beautiful modern chat styling.</p>
        </div>
      )}
    </div>
  )
}

export default MessageArea