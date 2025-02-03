'use client'

import { Button } from "@/components/ui/button";
import cuid from "cuid";
import { useRouter } from "next/navigation";



export default function Home() {
  
  const callId = cuid()
  const router = useRouter()
  
  const createMeeting = () =>{
        router.push(`/dashboard/${callId}`)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Button onClick={createMeeting}>Create Meeting</Button>
        <Button variant='secondary'>Join Meeting</Button>
    </div>
  );
}
