import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password, firstName, lastName } = body;

    if (!username || !email || !password || !firstName || !lastName) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const user = await prismadb.user.create({
      data: {
        username,
        email,
        password,
        firstName,
        lastName,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const users = await prismadb.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
