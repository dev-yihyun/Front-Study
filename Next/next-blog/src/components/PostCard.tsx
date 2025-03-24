import { Data } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";
type Props = {
    data: Data;
};
function PostCard({ data: { category, date, description, path, title } }: Props) {
    return (
        <>
            <Link href={`/posts/${path}`}>
                <div className="border rounded-md border-stone-300 overflow-hidden cursor-pointer">
                    <Image
                        className="w-full "
                        src={`/images/posts/${path}.png`}
                        height={100}
                        width={100}
                        alt={title}
                    />
                    <div className="p-4 flex flex-col items-center pt-2">
                        <p className="text-sm text-gray-700 self-end">{date}</p>
                        <h3 className="text-lg font-bold w-full truncate text-center">{title}</h3>
                        <p className="w-full truncate text-center">{description}</p>
                        <p className="text-sm rounded-lg bg-green-100 px-2 my-2">{category}</p>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default PostCard;
