import dynamic from 'next/dynamic';
import React from 'react'

const LiveBlockEditor = dynamic(() => import('@/components/CollaborativeEditor/LiveBlockEditor'), { 
    ssr: false 
  });
  

export default function page() {
  return (
    <div className=' w-screen h-screen'>
      <LiveBlockEditor/>
    </div>
  )
}
