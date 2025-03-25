import { getPostData, getPostPath } from "@/service/posts";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
    params: Promise<{ slug: string }>; // 타입 수정: Promise로 받음
};

async function PostPage({ params }: Props) {
    const { slug } = await params; // 비동기 처리로 await 적용
    const data = await getPostPath(slug);
    if (!data) {
        return (
            <>
                <p>포스트를 찾을 수 없습니다.</p>
            </>
        );
    }
    const { category, date, description, path, title } = data;

    const content = await getPostData(path);
    console.log("###content", content);
    // console.log("###content", typeof content);
    //     const markdown = `A paragraph with *emphasis* and **strong importance**.

    // > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

    // * Lists
    // * [ ] todo
    // * [x] done

    // A table:

    // | a | b |
    // | - | - |

    //  2023 Year Review!

    // `;
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

                    <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
                </div>
            </div>
        </>
    );
}

export default PostPage;
