import { getProducts } from "@/service/products";
import Link from "next/link";
import style from "./page.module.css";

// export const revalidate = 3;
// false | 'force-cache' | 0 | number
// false(기본값) : SSG로 동작하는 것을 볼 수 있다.
// 0 : SSR처럼 요청이 올때마다 항상 만들어진다.
// number : 몇초마다 ISR할 것인지

export default async function ProductsPage() {
    // 네트워크로 데이터를 읽어와 SSG

    const products = await getProducts();
    const res = await fetch("https://meowfacts.herokuapp.com", {
        next: { revalidate: 3 }, // revalidate: 0 -> SSR , revalidate: 3->ISR
        // cache: "no-store", // ==={revalidate: 0}
        // 브라우저 검사 > 네트워크 > 캐시사용 중지
        // cache되면 SSG로 행동
        cache: "reload",
    });
    const data = await res.json();
    const factText = data.data[0];
    return (
        <>
            <h1>ProductsPage 제품 소개 페이지</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <Link href={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
            <article className={style.article}>{factText}</article>
        </>
    );
}
