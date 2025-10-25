import AuthGuard from "@/components/common/AuthGuard";
import "../globals.css";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <section>{children}</section>
        </AuthGuard>
    );
}
