import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import { useMessages } from '../customHooks/getMessages'

function Home() {
  let { selectedUser } = useSelector(state => state.user)
  useMessages()
  return (
    <div className='min-h-screen w-full flex bg-slate-950 text-slate-100'>
      <SideBar />
      <MessageArea />
    </div>
  )
}

export default Home
