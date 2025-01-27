"use client";

import { CollaborativeEditor } from "@/components/CollaborativeEditor/CollaborativeEditor";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Language, LanguageSelector} from "./LanguageSelector";
import {  useState } from "react";

export default function LiveBlockEditor() {

    const [language,setLanguage] = useState<Language|null>()

    const onSelect = (language: Language) => { 
        setLanguage(null)     
        setLanguage(language)
    }

    console.log(language?.snippet);
    
    
  return (
    <div className="w-screen h-screen overflow-hidden">
        <div className="p-3">
        <LanguageSelector language={language?.name || "typescript v(5.1.6)"} onSelect={onSelect}/>
        </div>
      <div className="p-3 h-[90%]">
        <LiveblocksProvider
          publicApiKey={
            "pk_dev_VHduZugfYhmzP1wEMuG6zDgK7T4uZD3zZAdlt24h011ke7tUcemhc3cEpcq8uJS_"
          }
        >
          <RoomProvider id="my-room">
            <ClientSideSuspense fallback={<div>Loading…</div>}>
              <CollaborativeEditor language={language?.name || "defaultLanguage"} codeSnippet={language?.snippet || ""}/>
            </ClientSideSuspense>
          </RoomProvider>
        </LiveblocksProvider>
      </div>
    </div>
  );
}
