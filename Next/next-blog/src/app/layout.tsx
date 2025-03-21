import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "내가 만든 next blog", // 페이지의 제목
    description: "next.js로 만든 blog 입니다.", // 페이지의 설명으로 검색 엔진과 소셜미디어 미리보기에 표시된다.
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased mx-20`}>
                <header className="flex justify-between my-8 items-center text-black">
                    <h1 className="font-bold text-2xl ">
                        <Link href="/">Dev's Blog</Link>
                    </h1>
                    <nav className="flex text-base ">
                        <Link href="/" className="ml-8 mr-4">
                            HOME
                        </Link>
                        <Link href="/about" className="mr-4">
                            ABOUT
                        </Link>
                        <Link href="/posts" className="mr-4">
                            POST
                        </Link>
                        <Link href="/contact" className="mr-4">
                            CONTACT
                        </Link>
                    </nav>
                </header>
                {children}
            </body>
        </html>
    );
}
