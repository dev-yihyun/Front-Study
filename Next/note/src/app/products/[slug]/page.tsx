import { notFound } from "next/navigation";

type Props = {
    params: {
        slug: string; //폴더명과 동일하기
    };
};

export default function PantsPage({ params }: Props) {
    if (params.slug === "nothing") {
        notFound();
    }
    return <h1>{params.slug} 제품 설명 페이지</h1>;
}
/*
notfound파일은 정의되어있는 존재하는 경로 내에서 notfound 함수가
호출이 되면 products/not-found.tsx 파일이 호출된다.

404페이지를 내껄로 만들고 싶다면 
pages/404.tsx로 만들어 사용할 수 있다.

** 파일명이 중요하지 함수명은 중요하지않다.
*/
export function generateStaticParams() {
    const products = ["pants", "skirt"];
    return products.map((product) => ({
        slug: product,
    }));
}
