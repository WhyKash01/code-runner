import { NextRequest, NextResponse } from "next/server";
import User from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { number } from "zod";
const zod = require("zod");
const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    const body = await req.json();
  if(!body.authenticate){
    return NextResponse.json({
        message: "user not loggedin",
      });
  }
  const User = await prisma.user.findUnique(
    {
        where:{
            email: body.email
        }
    })
    const Rooms = await prisma.room.findMany(
      {
          where:{
            ownerId: User?.id
          }
      })
    return NextResponse.json({
        data:{
          User,
          Rooms
        }
      });
}
export async function GET(req: NextRequest){
  try {
    // Parse the URL to extract query parameters
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ message: 'username query parameter is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  const data={user}
    return NextResponse.json({ data });
  } catch (error) {
    // Use type assertion to handle unknown type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message: 'Internal server error', error: errorMessage }, { status: 500 });
  }
}

