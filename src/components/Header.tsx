import Image from "next/image";
import logo from "./../../public/cross.png"
import Toggle from "./Toggle";
import { Button } from "@/components/ui/button"
import LanguageSupport from "./LanguageSupport";
import { SocketIndicator } from "./SocketIndicator";
import Link  from "next/link";
export default function Home() {
  return (
    <div className="bg-cyan-900 z-50 flex shadow-lg justify-between px-5 py-3 border-b border-cyan-600">
    <div className="flex gap-10">
    <div className="flex gap-2 text-white items-center">
    <Image className="w-8 h-8" src={logo} alt=""></Image>
    <Link href="/">
    <h3 className="font-semibold text-lg">Code Runner</h3>
    </Link>
    </div>
    <div className="flex items-center gap-5">
    <LanguageSupport></LanguageSupport>
    <h3 className="font-semibold text-white">Blog</h3>
    </div>
    </div>
    <div className="flex items-center gap-5">
    <div className="ml-auto flex items-center">
      <SocketIndicator></SocketIndicator>
    </div>
    <Link href="/signUp">
    <Button className="h-9 bg-transparent hover:bg-cyan-800 text-white">SignUp</Button>
    </Link>
    <Link href="/login">
    <Button className="h-9 bg-cyan-950 hover:bg-zinc-900 text-white">Login</Button>
    </Link>
    <Toggle></Toggle>
    </div>
    </div>
  );
}