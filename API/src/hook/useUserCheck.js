// hook/useUserCheck.js
import { useMutation } from "react-query";

export const useUserCheck = (queryClient, navigate) =>
    useMutation(
        (userData) =>
            fetch("http://localhost:3001/login", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (!data.success) {
                    alert("현재 비밀번호가 맞지 않습니다.");
                }
            },
            onError: (error) => {
                console.error(error);
                alert("서버 오류가 발생했습니다.");
                navigate("/");
            },
            onSettled: () => {
                queryClient.invalidateQueries(["userInfo"]);
            },
        }
    );
