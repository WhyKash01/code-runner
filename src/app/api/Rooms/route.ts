import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.authenticate) {
    return NextResponse.json({
      message: "User not logged in",
    });
  }
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return NextResponse.json({
      message: "User not found",
    });
  }
  const existingRooms = await prisma.room.findMany({
    where: { name: body.name },
  });

  if (existingRooms.length === 0) {
    const room = await prisma.room.create({
      data: {
        ownerId: user.id,
        name: body.name,
      },
    });
    return NextResponse.json({
      message: "Room created",
      data: { room },
    });
  } else {
    return NextResponse.json({
      message: "Room already exists",
      data: { room: existingRooms[0] }, // Assuming you want to return the first matching room
    });
  }
}
