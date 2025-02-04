'use client'

import VideoCallMeeting from '@/components/VideoCallMeeting/VideoCallMeeting'
import { useSession } from '@clerk/nextjs'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const LiveBlockEditor = dynamic(() => import('@/components/CollaborativeEditor/LiveBlockEditor'), { 
    ssr: false 
  });

export default function Page(){
  const {callId}:{callId:string} = useParams()
  const {session}=useSession()
  const [token,setToken] = useState<string | undefined>('')
  const email = session?.user.primaryEmailAddress
  const id = email?.emailAddress.split('@')[0]
  
        const fetchToken =async () =>{
          const response = await axios.post(`/api/token`,{id})
          setToken(response.data.token)
        }
  
      useEffect(()=>{
        fetchToken()
      },[id])
  return (
    <div className='flex flex-col sm:flex-row h-screen w-screen'>
      <div className="sm:w-[50%]">
      <div className="text-sm text-center sm:hidden">Scroll down for code editor</div>
      <VideoCallMeeting callId={callId} token={token || ''}/>
      </div>
      <div className="sm:w-[50%]">
      <LiveBlockEditor roomId={callId}/>
      </div>
    </div>
  )
}
