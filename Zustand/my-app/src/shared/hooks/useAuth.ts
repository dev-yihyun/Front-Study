import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "../store/auth";

export const useAuth = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // 로그인이 필요한 페이지에서 사용
    const requireAuth = () => {
        if (!isAuthenticated) {
            router.push("/login");
            return false;
        }
        setIsLoading(false);
        return true;
    };

    // 로그인한 사용자가 접근하면 안되는 페이지에서 사용
    const requireGuest = () => {
        if (isAuthenticated) {
            router.push("/");
            return false;
        }
        setIsLoading(false);
        return true;
    };

    return {
        user,
        isAuthenticated,
        logout,
        requireAuth,
        requireGuest,
        isLoading,
    };
};
