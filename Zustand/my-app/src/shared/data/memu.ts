import { Home, LogIn, UserPlus, UserSearch } from "lucide-react";

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
    {
        title: "Find Account",
        url: "/find-account",
        icon: UserSearch,
    },
];
export const titleMap: Record<string, string> = {
    "/": "Home",
    "/login": "Login",
    "/signup": "Signup",
    "/find-account": "Find Account",
    "/todo": "Todo",
};
