"use client";
import { Data } from "@/service/posts";
import { useState } from "react";
import PostCard from "./PostCard";

interface FilterPostProps {
    data: Data[];
    category: string[];
}

const FilterPost: React.FC<FilterPostProps> = ({ data, category }) => {
    const [selected, setSelected] = useState("ALL");
    const filtering = selected === "ALL" ? data : data.filter((post) => post.category === selected);
    return (
        <>
            <section className="flex flex-row gap-5">
                <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {filtering.map((index) => (
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
                    <div className="flex flex-col gap-2 min-w-3/4 ">
                        {category.map((item, index) => (
                            <li
                                key={index}
                                className="cursor-pointer"
                                onClick={() => {
                                    setSelected(item);
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FilterPost;
