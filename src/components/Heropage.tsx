import { Button } from "./ui/button"
import JoinRoom from "./JoinRoom"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function Hero(){
    const router = useRouter()
    return(
        <div className="bg-cover bg-bannerImg bg-top bg-repeat w-full  flex flex-col gap-10 bg-slate-200 dark:bg-inherit justify-center h-[92vh] items-center">
            <h1 className="text-white text-8xl mb-10 font-semibold font-serif w-[40vw] text-center">Execute your ideas,</h1>
            
            <h2 className="text-white text-2xl w-[50vw] font-semibold text-center mx-72">Empowering developers with seamless compilation, turning code into solutions. Harness the power of our app to compile and unleash your programming prowess.</h2>
            <div className="flex mt-10 gap-10 items-center">
                <JoinRoom></JoinRoom>
                <Button onClick={()=>router.push("/code")
                    
                } className="text-white bg-sky-700 hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-10 py-6 text-center me-2 mb-2 ">Join Room</Button>
            </div>            
        </div>
    )
}