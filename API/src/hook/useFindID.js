import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useFindID = (onSuccess, onError) => {
    const navigate = useNavigate();

    return useMutation(
        (userData) =>
            fetch("http://localhost:3001/findid", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userData),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (!data || typeof data.success === "undefined") {
                    throw new Error("서버 응답이 올바르지 않습니다.");
                }
                onSuccess(data);
            },
            onError: (error) => {
                console.error("오류:", error);
                alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
                onError?.(error);
                navigate("/");
            },
        }
    );
};
