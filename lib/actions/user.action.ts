"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../connection";
import User from "../models/user.model";

interface Params {
  userId: string | undefined;
  bio: string;
  name: string;
  path: string;
  username: string;
  image: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    await connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(id: string) {
  await connectToDB();
  try {
    return User.findOne({ id: id });
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
}
