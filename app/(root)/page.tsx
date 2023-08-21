import { fetchThreads } from "@/lib/actions/thread.action";

export default async function Home() {
  const result = await fetchThreads(1, 30);
  console.log(result?.posts);

  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
    </div>
  );
}
