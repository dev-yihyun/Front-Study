import { create } from "zustand";
import { UserType } from "../types/user";

interface UserState {
    user: UserType | null;
    isLoggedIn: boolean;
    setUser: (user: UserType) => void;
    clearUser: () => void;
    login: (user: UserType) => void;
    logout: () => void;
}

const userStore = create<UserState>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user: UserType) => set({ user, isLoggedIn: true }),
    clearUser: () => set({ user: null, isLoggedIn: false }),
    login: (user: UserType) => set({ user, isLoggedIn: true }),
    logout: () => set({ user: null, isLoggedIn: false }),
}));

export default userStore;
