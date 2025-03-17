import Link from "next/link";
import styles from "./layout.module.css";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* products 경로 안에 있는 layout으로
        products경로는 app 폴더 안에 있기 때문에 중첩되어 나온다.
        */}
            <nav className={styles.nav}>
                <Link href="/products/women">여성옷</Link>
                <Link href="/products/man">남성옷</Link>
            </nav>
            <section className={styles.product}>{children}</section>
        </>
    );
}
