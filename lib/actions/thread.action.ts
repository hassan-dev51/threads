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

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  await connectToDB();
  try {
    // Calculate the number of posts to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
    const postsQuery = Threads.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "community",
        // model: Community,
      })
      .populate({
        path: "children", // Populate the children field
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });

    // Count the total number of top-level posts (threads) i.e., threads that are not comments.
    const totalPostsCount = await Threads.countDocuments({
      parentId: { $in: [null, undefined] },
    }); // Get the total count of posts

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
  } catch (error) {
    console.log(`Error in fetching threads ${error}`);
  }
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
      text: text,
      author: author,
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
