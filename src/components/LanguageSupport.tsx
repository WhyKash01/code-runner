"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import arrow from "./../../public/right-arrow.png"
import Image from "next/image"
import { useState } from "react"
export default function LanguageSupport(){
  const [Language, setLanguage] = useState(2)
  let object=[{
    language: "C",
    v1: "Data Types in C",
    v2: "C if...else Statement",
    v3: "C for Loop",
    v4: "Arrays in C Programming",
    v5: "Pointers in C",
  },
  {
    language: "C++",
    v1: "C++ if...else Statement",
    v2: "C++ for Loop",
    v3: "Arrays in C++",
    v4: "Strings in C++",
    v5: "C++ Class & Objects",
  },
  {
    language: "Python",
    v1: "Getting Started With Python",
    v2: "Python if Statement",
    v3: "while Loop in Python",
    v4: "Python Lists",
    v5: "Dictionaries in Python",
  },
  {
    language: "JavaScript",
    v1: "Operators in JavaScript",
    v2: "JavaScript for Loop",
    v3: "Functions in JavaScript",
    v4: "JavaScript Objects",
    v5: "Arrays in JavaScript",
  },
  {
    language: "Java",
    v1: "Java Hello World Program",
    v2: "Java for Loop",
    v3: "Arrays in Java",
    v4: "Interfaces in Java",
    v5: "Java ArrayList",
  },
  
] 

  return(
        <DropdownMenu >
  <DropdownMenuTrigger className=" font-semibold text-white text-xl flex items-center gap-1">Language Support<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></DropdownMenuTrigger>
  <DropdownMenuContent className="ml-[10vw] mt-5 font-semibold">
    
    <div className="flex flex-row gap-2 ">
    <div className="w-[10vw] border-r-2 flex-col flex justify-start gap-2">
    <div onClick={()=>{setLanguage(2)}} className="bg-transparent focus:border-r-4 focus:border-cyan-800 focus:bg-cyan-800/30 rounded-sm hover:bg-cyan-800 text-inherit text-lg pl-5">Python</div>
    <div onClick={()=>{setLanguage(3)}} className="bg-transparent focus:border-r-4 focus:border-cyan-800 focus:bg-cyan-800/30 rounded-sm hover:bg-cyan-800 text-inherit text-lg pl-5">JavaScript</div>
    <div onClick={()=>{setLanguage(1)}} className="bg-transparent focus:border-r-4 focus:border-cyan-800 focus:bg-cyan-800/30 rounded-sm hover:bg-cyan-800 text-inherit text-lg pl-5">C++</div>
    <div onClick={()=>{setLanguage(0)}} className="bg-transparent focus:border-r-4 focus:border-cyan-800 focus:bg-cyan-800/30 rounded-sm hover:bg-cyan-800 text-inherit text-lg pl-5">C</div>
    <div onClick={()=>{setLanguage(4)}} className="bg-transparent focus:border-r-4 focus:border-cyan-800 focus:bg-cyan-800/30 rounded-sm hover:bg-cyan-800 text-inherit text-lg pl-5">Java</div>
    
    </div>
    <div className="w-[20vw] pl-5 relative">
    <DropdownMenuItem className="text-lg text-center top-1 right-1 absolute">x</DropdownMenuItem>
     <div className="my-3">
      <h2 className="text-xl mb-2 font-bold">Popular Tutorials</h2>
      <h3 className="my-2 cursor-pointer text-zinc-400">{object[Language].v1}</h3>
      <h3 className="my-2 cursor-pointer text-zinc-400">{object[Language].v2}</h3>
      <h3 className="my-2 cursor-pointer text-zinc-400">{object[Language].v3}</h3>
      <h3 className="my-2 cursor-pointer text-zinc-400">{object[Language].v4}</h3>
      <h3 className="my-2 cursor-pointer text-zinc-400">{object[Language].v5}</h3>
     </div>
     <Button className="bg-cyan-800 mb-3 dark:hover:bg-cyan-700 rounded-sm  text-lg text-white">Start Codeing {object[Language].language}
      <Image alt="" className="w-4 ml-3" src={arrow}></Image>
     </Button>
    </div>
    </div>
    
  </DropdownMenuContent>
 </DropdownMenu>

    )
}