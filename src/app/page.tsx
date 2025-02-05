"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Copy } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { useSession } from "@clerk/nextjs";
import cuid from "cuid";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useClerk } from '@clerk/nextjs';
import { useToast } from "@/hooks/use-toast";
import {
  StreamVideoClient,
  User,
} from '@stream-io/video-react-sdk';
import axios from "axios";

  
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export default function Home() {
  const callId = cuid();
  const router = useRouter();
  const {toast} = useToast()
  const { signOut } = useClerk();
  const [value, setValue] = useState<string>("")
  const { isSignedIn,session } = useSession();
  const [token,setToken] = useState<string | undefined>('')

  const email = session?.user.primaryEmailAddress
      const profilePicture = session?.user.imageUrl
      const name = session?.user.firstName
  
      const id = email?.emailAddress.split('@')[0]
  
      const user: User = {
          id:id!,
          name:name!,
          image:profilePicture,
        };
  
        const fetchToken =async () =>{
          const response = await axios.post(`/api/token`,{id})
          setToken(response.data.token)
        }
        
        const client = new StreamVideoClient({ apiKey, user, token });

        const handleJoin =async () =>{
          const call =await client.queryCalls({
            filter_conditions:{
              id:value,
            }
          })
          if(call.calls.length > 0){
            router.push(`/meeting/${value}`);
          }else{
            toast({
              title:"Call not found!",
              description:"Please enter valid call id.",
              variant:"destructive"
            })
          }  
        }
      useEffect(()=>{
        fetchToken()
      },[id])

  const createMeeting = () => {
    router.push(`/meeting/${callId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setValue(e.target.value)
  }
  const logout =async () => {
    await signOut();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(callId);
    toast({
      title: 'Room Id copied!',
    });
  };

  return (
    <>
      <div className="w-screen h-screen">
        <div className="p-4 sm:p-8 sm:mx-20 flex justify-between">
          <h1 className="text-lg sm:text-xl text-slate-200">Tech - Arena</h1>
          {!isSignedIn ? (
            <>
              <div className="flex gap-2 z-10">
                <AnimatedGradientText onClick={() => { router.push('/sign-in'); }} className="z-10 cursor-pointer">Login now</AnimatedGradientText>
                <Button
                  variant="secondary"
                  className=" rounded-full"
                  onClick={() => { router.push('/sign-up'); }}
                >
                  Create account
                </Button>
              </div>
            </>
          ) : (
            <InteractiveHoverButton onClick={logout} className="z-10">
              Logout
            </InteractiveHoverButton>
          )}
        </div>

        <div className="mt-8 sm:my-12 p-4">
          <h1 className="text-xl sm:text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-200 text-shadow-lg">
            Collaborate, code, and learn together
            <br />
            Share knowledge, build something great.
          </h1>

          <p className="text-lg text-center my-3 font-extralight text-zinc-300">
            Collaborate in real time, build amazing projects, and grow together.{" "}
            <br />
            Join us and turn your ideas into reality!
          </p>

          {/* Join room button */}

          <div className="flex gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="z-10">
                  Join Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Join Meeting</DialogTitle>
                  <DialogDescription>
                    Enter room id to join meeting.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Room Id
                    </Label>
                    <Input id="name" value={value} onChange={handleChange} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="z-10 bg-zinc-200" onClick={handleJoin}>
                    Join
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Get started button */}

            <Dialog>
              <DialogTrigger asChild>
                <Button className="z-10 bg-zinc-200">Get Started</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Start meeting</DialogTitle>
                  <DialogDescription>
                    Anyone who has this room id will be able to join meeting.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Room Id
                    </Label>
                    <Input id="link" defaultValue={callId} readOnly />
                  </div>
                  <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
                    <span className="sr-only">Copy</span>
                    <Copy />
                  </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <div className=" w-full flex justify-between">
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                      <Button
                        className="z-10 bg-zinc-200"
                        onClick={createMeeting}
                      >
                        Start Meeting
                      </Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <StarsBackground className="z-0" />
        <ShootingStars className="z-0" />
      </div>
    </>
  );
}
