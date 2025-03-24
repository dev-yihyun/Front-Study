import { getNonFeaturedPosts } from "@/service/posts";
import CarouselComponent from "./CarouselComponent";
import PostCard from "./PostCard";

async function YouMayLike() {
    const data = await getNonFeaturedPosts();
    return (
        <>
            <div className="flex flex-col m-4">
                <h1 className="font-bold mb-4">you may like</h1>
                <div className="w-full">
                    <CarouselComponent>
                        {data.map((index) => (
                            <PostCard data={index} key={index.path} />
                        ))}
                    </CarouselComponent>
                </div>
            </div>
        </>
    );
}

export default YouMayLike;
