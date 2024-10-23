import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { room } from "@/Store/atom";

import { useRecoilState } from "recoil";
import { useSocket } from "./SocketComponent";

export default function AlertDialogDemo() {
  const { socket, isConnected } = useSocket();
  const [Room, setRoom] = useRecoilState(room);
  const router:any = useRouter(); // Get router from Next.js
  console.log(router)
  const handleJoinRoom = () => {
    console.log(router)
    if (Room) {
        setRoom(Room)
        console.log("Joining room:", Room); // Debug room value before emitting
        socket.emit("join-room", Room);
        router.push(`/code/Rooms?name=${Room}`);
      // Navigate to the "code" page after joining the room
      //router.push(`/code`);  // No need for isClient check, router is available
    } else {
      console.error("Room is undefined or empty");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-cyan-800 text-white hover:bg-cyan-700 text-lg font-normal">
          Create Room
        </Button>
        
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Enter Room Name</AlertDialogTitle>
          <AlertDialogDescription>
          <div className="my-2 text-zinc-300">Enter the name of the room for collaboration or group discussions.</div>
          </AlertDialogDescription>
          <Input
            className="mt-5"
            type="text"
            onChange={(e) => {
              setRoom(e.target.value);
              console.log("Room value set to:", e.target.value); // Debug input change
            }}
            placeholder="Room Name"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            {/* Replacing Link with button click to trigger room join and navigation */}
            <Button onClick={handleJoinRoom}>
              Join Room
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
