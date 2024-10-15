import { NextApiResponse } from "next/types";
import {Server as SocketIOServer} from "socket.io";
import {Server as NetServer, Socket} from "net";
export type NextApiResponseServerIo=NextApiResponse & {
    socket: Socket & {
        server: NetServer &{
            io: SocketIOServer;
        }
    }
}