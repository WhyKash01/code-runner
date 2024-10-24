"use client"
import Image from "next/image";
import logo from "./../../public/cross.png";
import Toggle from "./Toggle";
import { Button } from "@/components/ui/button";
import LanguageSupport from "./LanguageSupport";
import { SocketIndicator } from "./SocketIndicator";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation";
import { Loading } from "@/Store/atom";
import { useRecoilState } from "recoil";
import Loader from "./Loader";
export default function Home() {
  const [loading, setLoading] = useRecoilState(Loading);
  const router = useRouter();
  const session = useSession();
  return (
    <div>
    <div className="bg-zinc-950 z-50 flex shadow-lg justify-between h-[8vh] px-5 py-3 border-b border-cyan-600">
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
        {session.status == "unauthenticated" ? (
          <div className="flex items-center gap-1 sm:gap-5">
            <Link href="/signUp">
              <Button className="h-9 hidden sm:block bg-cyan-700 hover:bg-cyan-100 hover:text-black text-white">
                SignUp
              </Button>
            </Link>
            <Link href="/api/auth/signin">
              <Button
                onClick={() => {
                  signIn();
                }}
                className="h-9 bg-zinc-200 hidden sm:block hover:bg-white text-black"
              >
                Login
              </Button>
            </Link>
          </div>
        ) : null}
        {session.status == "authenticated" ? (
          <div className="flex items-center gap-1 sm:gap-5">
            <Button
              onClick={() => {
                router.push("/");
                signOut();
              }}
              className="h-9 bg-black hidden sm:block hover:bg-zinc-900 text-white"
            >
              Logout
            </Button>
            <Avatar onClick={()=>{
            router.push('/profile')
          }} className="p-[1.5px] hover:cursor-pointer bg-white w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </div>
        ) : null}
        <Toggle></Toggle>
      </div>
      </div>
      
    </div>

  );
}
