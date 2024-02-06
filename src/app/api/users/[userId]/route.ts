import { NextResponse } from "next/server";





import prismadb from "@/lib/prismadb";
export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const deletedUser = await prismadb.user.delete({
      where: {
        id: params.userId,
      }
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log('[USER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const { username, email, firstName, lastName } = body;

    if (!username || !email || !firstName || !lastName) {
      return new NextResponse("Username, Email, First Name, and Last Name are required", { status: 400 });
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        username,
        email,
        firstName,
        lastName,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('[USER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}