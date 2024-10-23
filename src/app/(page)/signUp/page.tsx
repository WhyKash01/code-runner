"use client"
import React from 'react'
import Header from '@/components/Header'
import SignUp from '../compo/SignUp'
export default function page() {
  return (
    <div className='bg-slate-200 dark:bg-inherit w-[100vw] h-[100vh]'>
      <Header></Header>
      <div className='2xl:pt-28 pt-24 flex justify-center items-center'>
      <div className='w-[50vw] flex justify-center dark:bg-zinc-900 rounded-lg border border-red-600 bg-white '>
        <SignUp></SignUp>
      </div>
      </div>
    </div>
  )
}
