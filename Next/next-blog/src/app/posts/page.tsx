import PostCard from "@/components/PostCard";
import { getAllData } from "@/service/posts";

async function PostsPage() {
    const data = await getAllData();
    const category = [...new Set(data.map((index) => index.category))];
    return (
        <>
            <section className="flex flex-row gap-5">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {data.map((index) => (
                        <PostCard data={index} key={index.path} />
                    ))}
                </div>
                <div className="list-none ">
                    <p
                        className="text-xl font-bold
                    border-b-5 border-gray-900/25 pb-3 mb-3
                    "
                    >
                        category
                    </p>
                    <div className="flex flex-col gap-2 ">
                        {category.map((item, index) => (
                            <li key={index} className="cursor-pointer">
                                {item}
                            </li>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default PostsPage;
