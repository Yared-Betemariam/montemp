"use server";

import connectDB from "@/mongoose/db";
import Users, { User } from "@/mongoose/models/user";

export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await Users.findOne({ email })
      .select("id email planId")
      .lean<User>()
      .exec();
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    await connectDB();
    const user = await Users.findById(id)
      .select("id email planId")
      .lean<User>()
      .exec();
    return user;
  } catch (error) {
    return null;
  }
};
