// src/components/common/GuestGuard.tsx (새로 생성)
"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type GuestGuardProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

function GuestGuard({ children, fallback }: GuestGuardProps) {
    const { requireGuest, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log(`##GuestGuard 실행: isAuthenticated = ${isAuthenticated}`);
        requireGuest();
        // if (!isLoading && isAuthenticated) {
        //     // 로그인된 사용자는 대시보드로 리다이렉트
        //     router.push("/dashboard");
        // }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return fallback || <div>로딩중 ... </div>;
    }

    if (isAuthenticated) {
        return null; // 리다이렉트 중
    }

    return <>{children}</>;
}

export default React.memo(GuestGuard);
