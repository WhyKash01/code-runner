import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketComponent";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { codeValue, language, Loading, room } from "@/Store/atom";
import { useSearchParams } from "next/navigation";
import Loader from "./Loader";

// Dynamically import Monaco Editor (client-side only)
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const CollaborativeEditor = () => {
  const { socket, isConnected } = useSocket();
  const [Language, setLanguage] = useRecoilState(language);
  const [Room, setRoom] = useRecoilState<string>(room);
  const [code, setCode] = useRecoilState(codeValue);
  const [loading, setLoading] = useRecoilState(Loading);
  const searchParams: any = useSearchParams();
  useEffect(() => {
    const roomName = searchParams.get("name"); // Get the 'name' query parameter
    if (roomName) {
      console.log("Room from URL:", roomName); // Log the room name
      setRoom(roomName); // Set the room from the query parameter
    } else {
      console.warn("Room name is not defined in the URL");
    }
    setLoading(false); // Stop loading
  }, [searchParams, setRoom]);

  const handleCodeChange = (newCode: string | undefined) => {
    
    console.log(JSON.stringify({code}));
    if (newCode !== undefined) {
      setCode(newCode);
      if (Room) {
        console.log("Emitting updated code to room:", Room);
        socket.emit("update-code", { code: newCode, room: Room });
      } else {
        console.warn("Room is not defined; cannot emit updated code.");
      }
    }
  };

  useEffect(() => {
    if (socket && isConnected) {
      // Listen for code updates from the server
      const handleCodeUpdated = (updatedCode: string) => {
        setCode(updatedCode); // Sync code with received updates
      };

      socket.on("code-updated", handleCodeUpdated);

      return () => {
        socket.off("code-updated");
      };
    }
  }, [socket, isConnected]);
  
  return (
    <div className=" rounded-md overflow-hidden flex flex-col items-center gap-4">
      

      {/* Code editor */}
      {isConnected && (
        <Editor
          theme="vs-dark"
          height="80vh"
          language={Language}
          value={code}
          onChange={(newValue) => handleCodeChange(newValue ?? "")}
        />
      )}
    </div>
  );
};

export default CollaborativeEditor;
