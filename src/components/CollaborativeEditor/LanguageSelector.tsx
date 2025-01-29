import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Language {
  name: string;
  version: string;
  snippet: string;
}

export interface LanguageSelectorProps {
  language: string;
  onSelect: (language: Language) => void;
}

export function LanguageSelector({ language, onSelect }: LanguageSelectorProps) {
  const languages: Language[] = [

    {
      name: "python",
      version: "3.10.0",
      snippet: `print("Hello, Python!")`,
    },
    {
      name: "go",
      version: "1.16.2",
      snippet: `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, Go!")\n}`,
    },
    {
      name: "c++",
      version: "10.2.0",
      snippet: `#include <iostream>\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}`,
    },
    {
      name: "c",
      version: "10.2.0",
      snippet: `#include <stdio.h>\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}`,
    },
    {
      name: "c#",
      version: "5.0.201",
      snippet: `using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, C#!");\n    }\n}`,
    },
    {
      name: "java",
      version: "15.0.2",
      snippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`,
    },
    {
      name: "javascript",
      version: "18.15.0",
      snippet: `console.log("Hello, JavaScript!");`,
    },
  ];

  const handleSelect = (value: string) => {
    const selectedLanguage = languages.find((lang) => lang.name === value);
    if (selectedLanguage) {
      onSelect(selectedLanguage); 
    }
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={language} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languages.map((lang, index) => (
            <SelectItem key={index} value={lang.name}>
              {lang.name} (v{lang.version})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
