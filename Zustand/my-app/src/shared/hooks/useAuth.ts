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
            console.log("##requireAuth");
            router.push("/login");
            return false;
        }
        console.log("##requireAuth");
        setIsLoading(false);
        return true;
    };

    // 로그인한 사용자가 접근하면 안되는 페이지에서 사용
    const requireGuest = () => {
        if (isAuthenticated) {
            console.log("##requireGuest");
            router.push("/");
            return false;
        }
        console.log("##requireGuest_");
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
