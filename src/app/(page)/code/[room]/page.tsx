"use client";
import CodeEditor from "@/components/CodeEditor";
import React from "react";
import LanguageSelector from "./LanguageSelector";
import Output from "@/components/Output";
import { Loading, room } from "@/Store/atom";
import { useRecoilState } from "recoil";

const Page = () => {
  // Renamed to "Page"
  const [Room, setRoom] = useRecoilState<string>(room);
  const [loading, setLoading] = useRecoilState(Loading);
  return (
    <div className="bg-cover bg-bannerImg1 bg-top bg-repeat w-full  flex flex-col gap-10 bg-slate-200 dark:bg-inherit justify-center h-[94vh] items-center">
      <div className="flex my-20 mx-20 justify-between gap-10">
        <div className="w-[50vw]">
          <div className=" flex  items-center gap-5 mb-5">
            <LanguageSelector />
            <div>{loading ? "Loading..." : `Current Room: ${Room}`}</div>
          </div>
          <CodeEditor />
        </div>
        <div>
          <Output />
        </div>
      </div>
    </div>
  );
};

export default Page;
