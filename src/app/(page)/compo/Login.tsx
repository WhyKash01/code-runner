"use client"
import axios from "axios"
import React, { useState } from "react";
import InputField from "./InputField";
import Link from "next/link"
import { string } from "zod";
const SignInContent = () => {
  const [userName, setuserName]= useState("")
  const [password, setpassword]= useState("")
  return (
    <div className="my-5">
      <h1 className="text-3xl text-center font-bold"> Login</h1>
      <h3 className="my-2 opacity-80 text-lg  text-center">
        Enter your information to Sign In your account{" "}
      </h3>
      <InputField onChange={(e: any)=>{
        setuserName(e.target.value)
      }} title={"Email"} placeholder={"xyz@gmail.com"} />
      <InputField onChange={(e: any)=>{
        setpassword(e.target.value)
      }} title={"Password"} placeholder={"123456"} />
      <button type="submit" onClick={async()=>{
        axios.post("http://localhost:3000/api/users",{
          data:{
            email: userName,
            password
          }
        })
        }} className="bg-zinc-950 mt-5 py-2 rounded-md text-white w-[100%] ">
        Login
      </button>
      <h3 className="mt-3 text-zinc-500 dark:text-zinc-100 text-lg  text-center">Don't have account? <Link className="underline ml-1" href="signUp">Sign Up</Link></h3>
    </div>
  );
};

export default SignInContent;
