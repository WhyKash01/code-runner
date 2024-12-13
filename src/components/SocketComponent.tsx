// components/SocketComponent.tsx

'use client'; // This line indicates that this is a client component

import { Children, useCallback, useContext, useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';
import { createContext } from 'react';
import { SocketIndicator } from './SocketIndicator';
type SocketcontextType ={
    socket: any | null;
    isConnected: boolean;
}
const SocketContext = createContext<SocketcontextType>({
    socket: null,
    isConnected: false,
    
});
export const useSocket=()=>{
    return useContext(SocketContext);
}


export const SocketComponent =({
    children
}:{
    children:React.ReactNode
})=>{
    
    const [socket, SetSocket]=useState(null);
    const [isConnected,setIsConnected]= useState(false);
    useEffect(()=>{
        const socketInstance= new (ClientIO as any)(process.env.
            NEXT_PUBLIC_SITE_URL!,{
            path: "/api/socket/io",
            addTrailingSlash: false,
        });
        socketInstance.on("connect",()=>{
            setIsConnected(true);
            console.log("Connected, socket ID:", socketInstance.id);
        });
        
        socketInstance.on("disconnect",()=>{
            setIsConnected(false);
        });

        SetSocket(socketInstance);
        return ()=>{
            socketInstance.disconnect();
        }
    },[]);
    return (
        <SocketContext.Provider value={{socket,isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}

