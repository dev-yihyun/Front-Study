import "../globals.css";

export default async function TodoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main>{children}</main>;
}
