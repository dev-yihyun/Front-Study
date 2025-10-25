import GuestGuard from "@/components/common/GuestGuard";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import "../globals.css";

export default async function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GuestGuard fallback={<LoadingOverlay />}>
            <section>{children}</section>
        </GuestGuard>
    );
}
