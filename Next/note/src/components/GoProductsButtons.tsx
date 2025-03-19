"use client";

import { useRouter } from "next/navigation";

export default function GoProductsButton() {
    const router = useRouter();

    return <button onClick={() => router.push("/products")}>제품 페이로 이동</button>;
}
