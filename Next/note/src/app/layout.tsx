import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <header className={styles.header}>
                    Demo Note App
                    <nav className={styles.nav}>
                        <Link href="/contact">Contact</Link>
                        <Link href="/about">About</Link>
                        <Link href="/products">Products</Link>
                    </nav>
                </header>

                {children}
            </body>
        </html>
    );
}
