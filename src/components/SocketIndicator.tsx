"use client"
import React, { useEffect } from 'react'
import {Badge} from "./ui/badge";
import {useSocket} from "./SocketComponent";
 export const SocketIndicator=()=> {
  const {isConnected, socket}=useSocket();
  
  
  if(!isConnected){
    return(
      <Badge variant="outline" className='bg-yellow-600 text-white border-none'>
        fallback: polling every 1s
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className='bg-emerald-600 text-white border-none'>
        Live: Real-time updates
    </Badge>
  )
}
