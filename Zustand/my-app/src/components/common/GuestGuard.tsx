// src/components/common/GuestGuard.tsx (새로 생성)
"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import React, { useEffect } from "react";
import PageLoadingSpinner from "./PageLoadingSpinner";

type GuestGuardProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

function GuestGuard({ children, fallback }: GuestGuardProps) {
    const { requireGuest, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        console.log(`##GuestGuard 실행: isAuthenticated = ${isAuthenticated}`);
        requireGuest();
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
        return fallback || <PageLoadingSpinner />;
    }

    if (isAuthenticated) {
        return null; // 리다이렉트 중
    }

    return <>{children}</>;
}

export default React.memo(GuestGuard);
