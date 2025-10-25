// src/components/common/GuestGuard.tsx (새로 생성)
"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import React, { useEffect } from "react";

function GuestGuard({ children }: { children: React.ReactNode }) {
    const { requireGuest } = useAuth();

    useEffect(() => {
        requireGuest();
    }, []);

    return <>{children}</>;
}

export default React.memo(GuestGuard);
