import MeowArticle from "@/components/MeowAritcle";
import { getProducts } from "@/service/products";
import Image from "next/image";
import Link from "next/link";
import clothesImage from "../../../public/images/clothes.jpg";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <>
            <h1>ProductsPage 제품 소개 페이지</h1>
            <Image src={clothesImage} alt="Clothes" priority />
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
