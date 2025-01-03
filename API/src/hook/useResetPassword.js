import { useMutation } from "react-query";

export const useResetPassword = (onSuccess, onError) => {
    return useMutation(
        async (userData) => {
            const response = await fetch("http://localhost:3001/resetpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error("비밀번호 변경 실패");
            }
            return response.json();
        },
        {
            onSuccess,
            onError,
        }
    );
};
