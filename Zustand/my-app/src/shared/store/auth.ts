import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserType } from "../types/user";

interface AuthState {
    user: UserType | null; // 현재 로그인한 사용자 정보(데이터)
    isAuthenticated: boolean; // 로그인 상태(true/false)(데이터)
    login: (user: UserType) => void; // 로그인 함수(액션)
    logout: () => void; // 로그아웃 함수(액션)
    setUser: (user: UserType | null) => void; //사용자 정보 설정 함수(액션)
}
/*
왜 이렇게 써야 하나?
데이터: user, isAuthenticated (상태)
액션: login, logout, setUser (상태를 변경하는 함수)
TypeScript: 타입 안전성을 위해 미리 정의
*/

/*
create<AuthState>(): 타입 안전한 스토어 생성
persist: 상태를 localStorage에 자동 저장
name: 'auth-storage': localStorage 키 이름
(set) => ({ ... }) : 초기 상태와 액션들 정의, set : 상태를 업데이트 하는 함수
*/
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // 초기 상태
            user: null,
            isAuthenticated: false,

            // 액션들
            login: (user) => {
                set({ user, isAuthenticated: true });
            },
            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
            setUser: (user) => set({ user, isAuthenticated: !!user }),
        }),
        {
            name: "auth-storage",
        }
    )
);
