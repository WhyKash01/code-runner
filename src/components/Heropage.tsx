import ChatDisplay from "./Chatdisplay"
import MessageSender from "./MessageSender"
import { Button } from "./ui/button"
import JoinRoom from "./JoinRoom"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function Hero(){
    const router = useRouter()
    return(
        <div className="flex flex-col gap-10 bg-slate-200 dark:bg-inherit justify-center h-[90vh] items-center">
            <h1 className="text-7xl font-medium">Execute your ideas,</h1>
            
            <h2 className="text-2xl font-light text-center mx-72">Empowering developers with seamless compilation, turning code into solutions. Harness the power of our app to compile and unleash your programming prowess.</h2>
            <div className="flex mt-10 gap-10 items-center">
                <JoinRoom></JoinRoom>
                <Button onClick={()=>router.push("/code")
                    
                } className="text-lg font-normal">Join Room</Button>
            </div>            
        </div>
    )
}