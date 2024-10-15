'use client'
import Heropage from "./../components/Heropage"
import Header from './../components/Header'
import {RecoilRoot} from 'recoil';
export default function Home() {
  
  return (
    <div>
    <RecoilRoot>
    <div className="">
      <Header></Header>
      <Heropage></Heropage>
    </div>
    </RecoilRoot>
    </div>
  );
}
