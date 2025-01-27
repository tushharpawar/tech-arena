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
      name: "typescript",
      version: "5.1.6",
      snippet: `const greet = (name: string): string => \`Hello, \${name}\`;`,
    },
    {
      name: "python",
      version: "3.11.5",
      snippet: `def greet(name):\n    return f"Hello, {name}"`,
    },
    {
      name: "go",
      version: "1.20.5",
      snippet: `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, Go!")\n}`,
    },
    {
      name: "c++",
      version: "17",
      snippet: `#include <iostream>\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}`,
    },
    {
      name: "c",
      version: "11",
      snippet: `#include <stdio.h>\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}`,
    },
    {
      name: "c#",
      version: "12.0",
      snippet: `using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, C#!");\n    }\n}`,
    },
    {
      name: "java",
      version: "20",
      snippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`,
    },
    {
      name: "javascript",
      version: "ES2023",
      snippet: `const greet = (name) => \`Hello, \${name}\`;`,
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
