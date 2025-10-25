import AuthGuard from "@/components/common/AuthGuard";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import "../globals.css";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard fallback={<LoadingOverlay />}>
            <section>{children}</section>
        </AuthGuard>
    );
}
