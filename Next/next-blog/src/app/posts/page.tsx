import FilterPost from "@/components/FilterPost";
import { getAllData } from "@/service/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Posts",
    description: "블로그 글",
};

async function PostsPage() {
    const data = await getAllData();
    const category = ["ALL", ...new Set(data.map((index) => index.category))];
    return (
        <>
            <FilterPost data={data} category={category} />
        </>
    );
}

export default PostsPage;
