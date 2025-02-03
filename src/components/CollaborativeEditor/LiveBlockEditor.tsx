"use client";

import { CollaborativeEditor } from "@/components/CollaborativeEditor/CollaborativeEditor";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Language, LanguageSelector} from "./LanguageSelector";
import { useState } from "react";
import OutputTerminal from "../Terminal/OutputTerminal";

export default function LiveBlockEditor() {

    const [language,setLanguage] = useState<Language|null>()
    const [value,setValue] = useState<string>("")

    const onSelect = (language: Language) => {     
        setLanguage(language)
    }

    const onChange = (value: string) =>{
        setValue(value)
    }


  return (
    <div className=" h-screen overflow-hidden">
        <div className="p-3 flex gap-2">
        <LanguageSelector language={language?.name || "typescript v(5.1.6)"} onSelect={onSelect}/>
        </div>
      <div className="p-3 h-[60%] my-1">
        <LiveblocksProvider
          publicApiKey={
            "pk_dev_VHduZugfYhmzP1wEMuG6zDgK7T4uZD3zZAdlt24h011ke7tUcemhc3cEpcq8uJS_"
          }
        >
          <RoomProvider id="my-room">
            <ClientSideSuspense fallback={<div>Loading…</div>}>
              <CollaborativeEditor language={language?.name || "Select Language"} codeSnippet={language?.snippet || ""} onChange={onChange}/>
            </ClientSideSuspense>
          </RoomProvider>
        </LiveblocksProvider>
        <OutputTerminal code={value} language={language?.name || ""} version={language?.version || ""}/>
      </div>
    </div>
  );
}
