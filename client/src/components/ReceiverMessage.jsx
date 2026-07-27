import React, { useEffect, useRef } from 'react'
import dp from '../assets/dp.webp'
import { useSelector } from 'react-redux'

function ReceiverMessage({ image, message }) {
  let scroll = useRef()
  let { selectedUser } = useSelector(state => state.user)

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message, image])

  const handleImageScroll = () => {
    scroll?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='flex items-end gap-4'>
      <div className='h-[44px] w-[44px] overflow-hidden rounded-full border border-slate-800 bg-slate-800 shadow-lg'>
        <img src={selectedUser?.image || dp} alt='' className='h-full w-full object-cover' />
      </div>
      <div ref={scroll} className='max-w-[78%] rounded-[32px] rounded-tl-none bg-slate-800 px-6 py-4 text-slate-100 shadow-2xl shadow-slate-950/20'>
        {image && <img src={image} alt='' className='mb-3 w-full max-w-[320px] rounded-3xl object-cover' onLoad={handleImageScroll} />}
        {message && <p className='text-base leading-7'>{message}</p>}
      </div>
    </div>
  )
}

export default ReceiverMessage
