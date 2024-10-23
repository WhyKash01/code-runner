"use client";
import CodeEditor from "@/components/CodeEditor";
import React from "react";
import LanguageSelector from "./LanguageSelector";
import Output from "@/components/Output";
import Header from "@/components/Header";

const Page = () => {
  // Renamed to "Page"
  return (
    <div>
      <Header />
      <div className="flex my-20 mx-20 justify-between gap-10">
        <div className="w-[50vw]">
          <div className="mb-5">
            <LanguageSelector />
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
