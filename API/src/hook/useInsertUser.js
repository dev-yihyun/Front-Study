// hook/useInsertUser.js
import { useMutation } from "react-query";

export function useInsertUser(userData, onSuccessCallback, onErrorCallback) {
    return useMutation(
        async () => {
            const res = await fetch("http://localhost:3001/signin", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userData()),
            });
            if (!res.ok) {
                throw new Error(`서버 요청 실패: ${res.status}`);
            }
            return res.json();
        },
        {
            onSuccess: onSuccessCallback,
            onError: onErrorCallback,
        }
    );
}
