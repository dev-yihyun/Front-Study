// src/lib/api.ts
import { UserType } from "@/shared/types/user";
import axios from "axios";

const BASE_URL = "http://localhost:3002"; // ⚙️ 환경에 맞게 조정 가능

// 이메일 중복 확인
export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        const res = await axios.get(`${BASE_URL}/users?useremail=${email}`);
        return res.data.length > 0;
    } catch (err) {
        console.error("Error checking email:", err);
        throw new Error("이메일 중복 확인 중 오류가 발생했습니다.");
    }
};

// 회원가입 요청
export const registerUser = async (userData: UserType): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/users`, userData);
    } catch (err) {
        console.error("Error registering user:", err);
        throw new Error("회원가입 요청 중 오류가 발생했습니다.");
    }
};
