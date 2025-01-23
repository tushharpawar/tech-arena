"use client";

import { CollaborativeEditor } from "@/components/CollaborativeEditor/CollaborativeEditor";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LanguageSelector } from "./LanguageSelector";
import {  useState } from "react";

export default function LiveBlockEditor() {

    const [language,setLanguage] = useState('javascript')

    const onSelect = (language: string) => {
        setLanguage(language)
    }

    console.log("language",language);
    
  return (
    <div className="w-screen h-screen overflow-hidden">
        <div className="p-3">
        <LanguageSelector language={language} onSelect={onSelect}/>
        </div>
      <div className="p-3 h-[90%]">
        <LiveblocksProvider
          publicApiKey={
            "pk_dev_VHduZugfYhmzP1wEMuG6zDgK7T4uZD3zZAdlt24h011ke7tUcemhc3cEpcq8uJS_"
          }
        >
          <RoomProvider id="my-room">
            <ClientSideSuspense fallback={<div>Loading…</div>}>
              <CollaborativeEditor language={language}/>
            </ClientSideSuspense>
          </RoomProvider>
        </LiveblocksProvider>
      </div>
    </div>
  );
}
