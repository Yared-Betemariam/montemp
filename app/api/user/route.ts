import { getUserById } from "@/data/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id") as string;
    let user = await getUserById(query);
    console.log(user);
    return NextResponse.json({ user: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({});
  }
};
