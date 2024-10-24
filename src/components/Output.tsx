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
  const [Language, setLanguage] = useRecoilState(language);
  const [version, setVersion] = useState("");
  const [ResponseData, setResponseData] = useState<any>("");
  const [loading, setLoading] = useRecoilState(Loading);
  const [err, setErr]= useState(false);
  useEffect(() => {
    let selectedVersion = CODE_VERSION[Language];
    setVersion(selectedVersion);
  }, [Language]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(JSON.stringify(code))
    try {
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
      <Button onClick={submitHandler} className=" mb-5">
        Run Code
      </Button>
      <div className={`bg-[#1E1E1E] p-5 h-[75vh] w-[46vw] ${err? "text-red-600": "text-zinc-200"} rounded-md`}>{ResponseData}</div>
    </div>
  );
};

export default Output;
