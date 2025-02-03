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
    <div className='flex h-screen w-screen'>
      <div className="w-[50%]">
      <VideoCallMeeting callId={callId} token={token || ''}/>
      </div>
      <div className="w-[50%]">
      <LiveBlockEditor/>
      </div>
    </div>
  )
}
