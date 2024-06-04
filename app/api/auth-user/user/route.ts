import { getUserByEmail, getUserById } from "@/data/user";
import connectDB from "@/mongoose/db";
import Users from "@/mongoose/models/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    console.log("alskdldsldjljlkj kl ");
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("email") as string;
    console.log(query);
    await connectDB();
    let user = await getUserByEmail(query);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (!body.email) {
      return NextResponse.json({ message: "Invalid" }, { status: 400 });
    }
    await Users.create({
      email: body.email,
      image: body?.picture,
      name: body?.name,
    });
    return NextResponse.json({ message: "Created" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
