import GuestGuard from "@/components/common/GuestGuard";
import "../globals.css";

export default async function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GuestGuard>
            <section>{children}</section>
        </GuestGuard>
    );
}
