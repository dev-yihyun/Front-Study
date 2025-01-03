import { useMutation } from "react-query";

export const useFindPassword = (onSuccess, onError) => {
    return useMutation(
        async (userData) => {
            const response = await fetch("http://localhost:3001/findpw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error(`서버 요청 실패: ${response.status}`);
            }
            return response.json();
        },
        {
            onSuccess,
            onError,
        }
    );
};
