import { Home, LogIn, UserPlus } from "lucide-react";

// Menu items.
export const menuItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Login",
        url: "/login",
        icon: LogIn,
    },
    {
        title: "Signup",
        url: "/signup",
        icon: UserPlus,
    },
];
export const titleMap: Record<string, string> = {
    "/": "홈",
    "/login": "로그인",
    "/signup": "회원가입",
    "/todo": "할 일 목록",
};
