"use server";

import { absoulteUrl } from "@/config";
import connectDB from "@/mongoose/db";
import Users, { User } from "@/mongoose/models/user";

export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await Users.findOne({ email }).lean<User>().exec();
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    await connectDB();
    const user = await Users.findById(id).lean<User>().exec();
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByEmailAPI = async (email: string) => {
  try {
    const res = await fetch(absoulteUrl(`/api/user?email=${email}`), {
      method: "GET",
    });
    const data = await res.json();
    return data as User;
  } catch (error) {
    return null;
  }
};

export const createUserAPI = async ({
  email,
  picture,
  name,
}: {
  email?: string;
  picture?: string;
  name?: string;
}) => {
  try {
    await fetch(absoulteUrl("/api/user"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        picture,
        name,
      }),
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
