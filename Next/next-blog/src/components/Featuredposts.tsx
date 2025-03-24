import { getFeaturedPosts } from "@/service/posts";
import PostCard from "./PostCard";

async function Featuredposts() {
    const data = await getFeaturedPosts();
    return (
        <>
            <div className="flex flex-col m-4">
                <h1 className="font-bold mb-4">Featured posts</h1>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data.map((index) => (
                        <PostCard data={index} key={index.path} />
                    ))}
                </div>
            </div>
            {/*  */}
        </>
    );
}

export default Featuredposts;
