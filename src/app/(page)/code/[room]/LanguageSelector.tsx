import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRecoilState } from "recoil";
import { language, codeValue, room } from "@/Store/atom";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/components/SocketComponent";
export const CODE_SNIPPETS = {
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  cpp: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}\n`,
};

const LanguageSelector = () => {
  const { socket, isConnected } = useSocket();
  const [Language, setLanguage] = useRecoilState(language);
  const [value, setValue] = useRecoilState(codeValue);
  const [Room, setRoom] = useRecoilState<string>(room);
  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setValue(newCode);
      if (Room) {
        console.log("Emitting updated code to room:", Room);
        socket.emit("update-code", { code: newCode, room:Room });
      } else {
        console.warn("Room is not defined; cannot emit updated code.");
      }
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="text-white capitalize bg-sky-700 hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-8 py-2 text-center ">{Language}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setLanguage("javascript");
              handleCodeChange(CODE_SNIPPETS.javascript);
              
            }}
          >
            javascript
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setLanguage("cpp");
              handleCodeChange(CODE_SNIPPETS.cpp);
            }}
          >
            C++
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setLanguage("python");
              handleCodeChange(CODE_SNIPPETS.python);
            }}
          >
            Python
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setLanguage("java");
              handleCodeChange(CODE_SNIPPETS.java);
            }}
          >
            Java
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
