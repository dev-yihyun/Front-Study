import { Home, LayoutDashboard, LogIn, UserPlus, UserSearch } from "lucide-react";

// Menu items.
export const authMenuItems = [
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
export const appMenuItems = [
    {
        title: "DashBoard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
];

export const titleMap: Record<string, string> = {
    "/": "Home",
    "/login": "Login",
    "/signup": "Signup",
    "/find-account": "Find Account",
    "/todo": "Todo",
    "/dashboard": "DashBoard",
};
