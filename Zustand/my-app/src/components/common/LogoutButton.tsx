// src/components/common/LogoutButton.tsx (새로 생성)
"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/shared/hooks/useAuth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function LogoutButton() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout(); // Zustand 스토어에서 로그아웃
        router.push("/"); // 홈으로 이동
    };

    return (
        <Button onClick={handleLogout} variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
        </Button>
    );
}

export default React.memo(LogoutButton);
