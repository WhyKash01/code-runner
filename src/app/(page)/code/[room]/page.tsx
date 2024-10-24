"use client";
import CodeEditor from "@/components/CodeEditor";
import React from "react";
import LanguageSelector from "./LanguageSelector";
import Output from "@/components/Output";
import { Loading, room } from "@/Store/atom";
import { useRecoilState } from "recoil";
import Loader from "@/components/Loader";

const Page = () => {
  // Renamed to "Page"
  const [Room, setRoom] = useRecoilState<string>(room);
  const [loading, setLoading] = useRecoilState(Loading);
  return (
    <div className="bg-cover justify-center bg-bannerImg1 bg-top bg-repeat w-full flex h-[92vh] items-center">
      <div className="flex my-20 mx-[3vw] justify-between gap-[2vw]">
        <div className="w-[46vw]">
          <div className=" flex  items-center gap-5 mb-5">
            <LanguageSelector />
            <div className="text-white font-bold capitalize">{loading ? "Loading..." : `Current Room: ${Room}`}</div>
          </div>
          <CodeEditor />
        </div>
        <div >
          <Output />
        </div>
      </div>
      <div className="absolute z-50 ">{loading?<Loader/>:<></>}</div>
    </div>
  );
};

export default Page;
