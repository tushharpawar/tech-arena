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
import { Copy } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";

export default function LiveBlockEditor({roomId}:{roomId:string}) {

    const [language,setLanguage] = useState<Language|null>()
    const [value,setValue] = useState<string>("")
    const {toast} = useToast()

    const onSelect = (language: Language) => {     
        setLanguage(language)
    }

    const onChange = (value: string) =>{
        setValue(value)
    }

    const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const inviteUrl = `${baseUrl}/meeting/${roomId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    toast({
      title: 'URL Copied!',
      description: 'Invite URL has been copied to clipboard.',
    });
  };


  return (
    <div className=" h-screen overflow-hidden">
        <div className="p-3 flex gap-2">
        <LanguageSelector language={language?.name || "Select a Language"} onSelect={onSelect}/>

        {/* Share link */}
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join you.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={inviteUrl}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only" onClick={copyToClipboard}>Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </div>
      <div className="p-3 h-[60%] my-1">
        <LiveblocksProvider
          publicApiKey={
            "pk_dev_VHduZugfYhmzP1wEMuG6zDgK7T4uZD3zZAdlt24h011ke7tUcemhc3cEpcq8uJS_"
          }
        >
          <RoomProvider id={roomId}>
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
