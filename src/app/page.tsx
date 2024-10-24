"use client"
import Loader from "@/components/Loader";
import Heropage from "./../components/Heropage"
import { Loading } from "@/Store/atom";
import { useRecoilState } from "recoil";
export default function Home() {
  const [loading, setLoading] = useRecoilState(Loading);
  return (
    <div>
    <div className=" flex justify-center items-center">
      <Heropage></Heropage>
      <div className="absolute z-50 ">{loading?<Loader/>:<></>}</div>
    </div>
    </div>
  );
}
