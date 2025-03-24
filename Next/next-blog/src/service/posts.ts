import { promises } from "fs";
import path from "path";

export type Data = {
    title: string;
    description: string;
    date: string;
    category: string;
    path: string;
    featured: boolean;
};

export type PostData = {
    content: string;
};

export async function getAllData(): Promise<Data[]> {
    const filePath = path.join(process.cwd(), "data", "posts.json");
    const data = await promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

export async function getFeaturedPosts(): Promise<Data[]> {
    return getAllData().then((datas) => datas.filter((data) => !data.featured));
}

export async function getNonFeaturedPosts(): Promise<Data[]> {
    return getAllData().then((datas) => datas.filter((data) => data.featured));
}
