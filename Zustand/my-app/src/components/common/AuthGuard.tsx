// src/components/common/AuthGuard.tsx (새로 생성)
"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import React, { useEffect } from "react";
import PageLoadingSpinner from "./PageLoadingSpinner";

type AuthGuardProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

function AuthGuard({ children, fallback }: AuthGuardProps) {
    const { requireAuth, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        requireAuth();
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
        return fallback || <PageLoadingSpinner />;
    }

    if (isAuthenticated) {
        return null; // 리다이렉트 중
    }

    return <>{children}</>;
}

export default React.memo(AuthGuard);
