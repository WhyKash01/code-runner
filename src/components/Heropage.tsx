import { Button } from "./ui/button"
import Link from "next/link"
export default function Hero(){
    return(
        <div className="flex flex-col gap-10 bg-slate-200 dark:bg-inherit justify-center h-[90vh] items-center">
            <h1 className="text-7xl font-medium">Execute your ideas,</h1>
            
            <h2 className="text-2xl font-light text-center mx-72">Empowering developers with seamless compilation, turning code into solutions. Harness the power of our app to compile and unleash your programming prowess.</h2>
            <div className="flex mt-10 gap-10 items-center">
                <Link href="Abc">
                <Button  className="bg-cyan-800 text-white hover:bg-cyan-700 text-lg font-normal">Create Room</Button>
                </Link>
                <Button className="text-lg font-normal">Join Room</Button>
            </div>
        </div>
    )
}