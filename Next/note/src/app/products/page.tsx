import MeowArticle from "@/components/MeowAritcle";
import { getProducts } from "@/service/products";
import Link from "next/link";

export default async function ProductsPage() {
    throw new Error("강제 에러 발생!"); // 일부러 에러 발생
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
            <MeowArticle />
        </>
    );
}
