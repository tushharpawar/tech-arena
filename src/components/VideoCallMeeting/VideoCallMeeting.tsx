"use client"

import {
    CallControls,
    CallingState,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    useCall,
    useCallStateHooks,
    User,
  } from '@stream-io/video-react-sdk';
  
import '@stream-io/video-react-sdk/dist/css/styles.css';
import './style.css';
import { useSession } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
    
    export default function VideoCallMeeting({ callId,token }: { callId: string,token: string }) {
    const {session}=useSession()
    const email = session?.user.primaryEmailAddress
    const profilePicture = session?.user.imageUrl
    const name = session?.user.firstName

    const id = email?.emailAddress.split('@')[0]

    const user: User = {
        id:id!,
        name:name!,
        image:profilePicture,
      };


    const client = new StreamVideoClient({ apiKey, user, token });
    const call = client.call('default', callId);
    call.join({ create: true });

    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout/>
        </StreamCall>
      </StreamVideo>
    );
  }
  
  export const MyUILayout = () => {
    const { useCallCallingState } = useCallStateHooks();
    const call= useCall()
    const callingState = useCallCallingState();
    const router = useRouter()
  
    if (callingState !== CallingState.JOINED) {
      return <div>Loading...</div>;
    }

    const onLeave = () =>{
      call?.endCall()
      call?.camera.disable()
      call?.microphone.disable()
      call?.streamClient.disconnectUser()
      router.replace('/')
    }
  
    return (
      <StreamTheme>
        <SpeakerLayout participantsBarPosition='bottom'/>
        <CallControls onLeave={onLeave}/>
      </StreamTheme>
    );
  };