// src/components/common/AuthGuard.tsx (새로 생성)
"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type AuthGuardProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

function AuthGuard({ children, fallback }: AuthGuardProps) {
    const { requireAuth, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        requireAuth();
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return fallback || <div>로딩중 ... </div>;
    }

    if (isAuthenticated) {
        return null; // 리다이렉트 중
    }

    return <>{children}</>;
}

export default React.memo(AuthGuard);
