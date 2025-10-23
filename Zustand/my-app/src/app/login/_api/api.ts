// src/lib/api.ts
import { UserType } from "@/shared/types/user";
import axios from "axios";

const BASE_URL = "http://localhost:3002";

// 로그인 함수
export const loginUser = async (email: string, password: string): Promise<UserType> => {
    try {
        const res = await axios.get(`${BASE_URL}/users`, {
            params: {
                useremail: email,
                userpassword: password,
            },
        });

        if (res.data.length === 0) {
            throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        return res.data[0]; // 로그인 성공한 사용자 데이터 반환
    } catch (err) {
        console.error("로그인 오류:", err);
        throw err;
    }
};
