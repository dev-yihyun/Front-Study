// hook/useCheckIDAvailability.js
import { useMutation } from "react-query";

export function useCheckIDAvailability(onSuccessCallback, onErrorCallback) {
    return useMutation(
        async (inputID) => {
            const res = await fetch("http://localhost:3001/idcheck", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ inputID }),
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
