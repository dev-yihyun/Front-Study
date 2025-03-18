import { getProducts } from "@/service/products";
import Link from "next/link";

export const revalidate = 3;
// false | 'force-cache' | 0 | number
// false(기본값) : SSG로 동작하는 것을 볼 수 있다.
// 0 : SSR처럼 요청이 올때마다 항상 만들어진다.
// number : 몇초마다 ISR할 것인지

export default async function ProductsPage() {
    const products = await getProducts();
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
        </>
    );
}
