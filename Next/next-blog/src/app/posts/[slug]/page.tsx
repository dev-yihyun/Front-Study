import MarkdownComponent from "@/components/MarkdownComponent";
import { getPostData } from "@/service/posts";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const { title, description } = await getPostData(slug);
    return {
        title,
        description,
    };
}

async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostData(slug);

    if (!post) {
        return (
            <>
                <p>포스트를 찾을 수 없습니다.</p>
            </>
        );
    }
    const { title, description, date, category, path, content } = post;
    return (
        <>
            <div className="border border-gray-200">
                <Image
                    src={`/images/posts/${path}.png`}
                    className="w-full h-1/5 max-h-[500px]"
                    height={500}
                    width={500}
                    alt={title}
                    priority
                />
                <div className=" p-5">
                    <p>PostPage {slug}</p>

                    <div className="flex flex-col ">
                        <h1 className="font-bold text-6xl my-5">{title}</h1>
                        <p className="text-gray-800">{description}</p>
                    </div>

                    <hr className="text-gray-300 my-4" />

                    <div className="rounded-md p-2 my-4 size-auto font-bold text-blue-500 flex flex-row gap-2 items-center">
                        <p className="flex flex-row gap-2 items-center text-gray-500">
                            <SlCalender />
                            {date}
                        </p>
                        {`# ${category}`}
                    </div>
                    <MarkdownComponent content={content} />
                </div>
            </div>
        </>
    );
}

export default PostPage;
