import { promises } from "fs";
import { readFile } from "fs/promises";
import path from "path";

export type Data = {
    title: string;
    description: string;
    date: string;
    category: string;
    path: string;
    featured: boolean;
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

export async function getPostPath(prop: string): Promise<Data | undefined> {
    const post = await getAllData();
    return post.find((data) => data.path === prop);
}

export async function getPostData(fileName: string) {
    const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
    const metadata = await getAllData().then((posts) =>
        posts.find((post) => post.path === fileName)
    );
    if (!metadata) {
        throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);
    }
    const content = await readFile(filePath, "utf-8");
    return { ...metadata, content };
}
