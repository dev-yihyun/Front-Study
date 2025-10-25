// src/components/common/AuthGuard.tsx (새로 생성)
"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import React, { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { requireAuth } = useAuth();

    useEffect(() => {
        requireAuth();
    }, []);

    return <>{children}</>;
}

export default React.memo(AuthGuard);
