import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/form/PostThread";
import { fetchUser } from "@/lib/actions/user.action";

const CreatePost = async () => {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <div>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo._id} />
    </div>
  );
};

export default CreatePost;
