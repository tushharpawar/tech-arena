import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}

export function LanguageSelector({ language, onSelect }: LanguageSelectorProps) {

    const languages =[
            {
            name:"typescript",
                version:"1.3.3"
            },
            {
                name:"python",
                version:"3.3.3"
            }
    ]

    const handleSelect = (language: string) =>{
        console.log("LL",language);
        
        onSelect(language)
    }

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={language} defaultChecked={true} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
            {
            languages.map((language,index)=>(
                <SelectItem onSelect={()=>handleSelect(language.name)} key={index} value={language.name}>
                    {language.name || language.version}
                </SelectItem>
            ))
        }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
