import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

export const metadata: Metadata = {
    title: {
        default: "next로 만드는 나의 blog",
        template: "next로 만드는 blog | %s",
    },
    description: "next.js로 만든 blog 입니다.",
    icons: {
        icon: "/favicon.icon",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex flex-col w-full max-w-screen-2xl px-10 mx-auto">
                <Header />
                <main className="grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
