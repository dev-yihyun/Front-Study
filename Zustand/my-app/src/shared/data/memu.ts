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
    "/": "Home",
    "/login": "Login",
    "/signup": "Signup",
    "/todo": "Todo",
};
