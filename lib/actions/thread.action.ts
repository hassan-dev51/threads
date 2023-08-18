"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../connection";
import Threads from "../models/thread.model";
import User from "../models/user.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createthread({
  text,
  author,
  communityId,
  path,
}: Params) {
  await connectToDB();

  try {
    const createThread = await Threads.create({
      text,
      author,
      comunity: null,
    });

    //update the user schema also because we want to know which user created it
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });
    //this is done due to changes reflect imediately
    revalidatePath(path);
  } catch (error) {
    console.log(`error in thread action file ${error}`);
  }
}
