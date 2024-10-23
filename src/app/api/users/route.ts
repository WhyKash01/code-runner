import { NextRequest, NextResponse } from "next/server";
import User from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import Email from "next-auth/providers/email";
const zod = require("zod");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const signupBody = zod.object({
  email: zod.string().email(),
  username: zod.string(),
  name: zod.string(),
  password: zod.string(),
});
const userDetail:any = zod.object({
    email: zod.string().email(),
    authenticate: zod.boolean()
  });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { success } = signupBody.safeParse(body);
  if (!success) {
    return NextResponse.json({
      message: "Incorrect inputs",
    });
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(body.password, saltRounds);
  try {
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        name: body.name,
        password: hash,
      },
      
    });
    const response = { ...newUser, authenticate: true };
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      message: "Email already taken or username all ready taken",
      authenticate: false,
    });
  }
}

// export async function GET(request: NextRequest) {
//   const users = await prisma.userDetail.findMany({
    
//     include: {
//       user: true
//   },
//   });
//   return NextResponse.json(users);
// }
