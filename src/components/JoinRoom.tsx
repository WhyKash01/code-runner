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
import { Loading, room } from "@/Store/atom";
import { RocketIcon } from "@radix-ui/react-icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useRecoilState } from "recoil";
import { useSocket } from "./SocketComponent";

export default function AlertDialogDemo() {
  const { socket, isConnected } = useSocket();
  const [al,setAl]=useState(false)
  const [Room, setRoom] = useRecoilState(room);
  const router:any = useRouter(); // Get router from Next.js
  const [loading, setLoading] = useRecoilState(Loading);
  console.log(router)
  const handleJoinRoom = () => {
    console.log(router)
    try {
      setLoading(true)
      if (Room) {
        setRoom(Room)
        console.log("Joining room:", Room); // Debug room value before emitting
        socket.emit("join-room", Room);
        socket.on('room-joined', async () => {
          console.log("Joined room successfully");
          await router.push(`/code/Rooms?name=${Room}`);
        });
      // Navigate to the "code" page after joining the room
      //router.push(`/code`);  // No need for isClient check, router is available
    } else {
      console.error("Room is undefined or empty");
    }
    } catch (error) {
      console.log(error)
    }
    finally{
      setTimeout(() => {
        setLoading(false)
        setAl(true)
      }, 5000);
    }
  };
  if(al){
    setTimeout(()=>{
      setAl(false)
    },5000)
  }
  return (
    <div className="flex justify-center items-center">
      
    {al?<Alert className="absolute w-[40vw] left-[30vw] top-[10vh] border border-red-900">
      <RocketIcon className="h-10 w-10 mt-2" />
      <AlertTitle className="text-red-600 text-xl ml-7">ConnectionError</AlertTitle>
      <AlertDescription className="text-lg text-red-600 ml-7">
      Error: Unable to connect to the room. Please try again.
      </AlertDescription>
    </Alert>:<></>}
      
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-white bg-zinc-950 hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-sky-200 font-medium rounded-full text-lg px-10 py-6 text-center me-2 mb-2">
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
    </div>
  );
}
