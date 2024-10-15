import NextAuth from "next-auth";
import {  PrismaClient } from '@prisma/client';
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github"
import { NextResponse } from "next/server";
const handler = NextAuth({
    providers:[
        Credentials({
            name: "Email",
            credentials: {
                username:{ label: 'email', type: 'text', placeholder: 'Email'},
                password: { label: 'password', type: 'password', placeholder: 'password'},
            },
            async authorize(credentials:any): Promise<any>{
                
                    const prisma = new PrismaClient();
                    try {
                        const User =await prisma.user.findUnique({
                            where: {
                                email: credentials.username
                            }
                        })
                        if(!User){
                            throw new Error ("no user found with this email")
                        }
                        const bcrypt = require('bcrypt');
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, User.password)
                        if(isPasswordCorrect){
                            return User
                        }
                        else{
                            throw new Error("password not correct")
                        }
                    } catch (error:any) {
                        throw new Error(error)
                        
                    }  
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ||"",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        session: ({session, token, User}:any)=>{
            console.log(session)
            if(session && session.user){
                session.user.id= token.sub;
            }
            return session;
        }
    }
});

export const GET= handler;
export const POST= handler;