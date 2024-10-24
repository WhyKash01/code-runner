import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRecoilState } from "recoil";
import { codeValue, language, Loading } from "@/Store/atom";
import axios from "axios";
export const CODE_VERSION: any = {
  javascript: "1.32.3",
  python: "3.10.0",
  java: "15.0.2",
  cpp: "10.2.0",
};
const Output = () => {
  const [code, setCode] = useRecoilState(codeValue);
  const [Default, setDefault]=useState(true)
  const [Language, setLanguage] = useRecoilState(language);
  const [version, setVersion] = useState("");
  const [ResponseData, setResponseData] = useState<any>(`Click "Run Code" to see the output here`);
  const [loading, setLoading] = useRecoilState(Loading);
  const [err, setErr]= useState(false);
  useEffect(() => {
    setDefault(true)
    setResponseData(`Click "Run Code" to see the output here`)
    let selectedVersion = CODE_VERSION[Language];
    setVersion(selectedVersion);
  }, [Language]);
  let colour;
  if(err){
    colour="text-red-600";
  }
  else if(Default){
    colour="text-zinc-500";
  }
  else{
    colour="text-zinc-200";
  }
  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(JSON.stringify(code))
    try {
      setDefault(false)
      setLoading(true);
      const response:any = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: Language,
        version: version,
        files: [
          {
            content: code
          },
        ],
      });
      setResponseData(response.data.run.output);
      response.data.run.stderr ? setErr(true) : setErr(false)
    } catch (error) {
      console.log(error)
      // setResponseData()
      alert("Backend Not working")
      console.error("Error submitting data", error);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div>
      <Button onClick={submitHandler} className="  bg-white text-black hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-8 py-2 text-center mb-5">
        Run Code
      </Button>
      <div className={`bg-[#1E1E1E] p-5 h-[80vh] w-[46vw] ${colour} rounded-md`}>
        <div className="mb-2 text-xl font-bold text-zinc-500 capitalize">
        {Language+" "+version}
        </div>
        <div>
        {ResponseData}
        </div>
        </div>
    </div>
  );
};

export default Output;
