// hook/useUpdatePassword.js
import { useMutation } from "react-query";

export const useUpdatePassword = (userID, queryClient, navigate) =>
    useMutation(
        (newPassword) =>
            fetch("http://localhost:3001/resetpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword),
            }).then((res) => {
                if (!res.ok) throw new Error("비밀번호 변경 실패");
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                    alert("비밀번호가 성공적으로 변경되었습니다. 로그인 후 접속해 주세요.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userID");
                    navigate("/");
                } else {
                    alert("비밀번호 수정에 실패했습니다. 메인으로 돌아갑니다.");
                    navigate("/main");
                }
            },
            onError: (error) => {
                console.error(error);
                alert("서버 오류가 발생했습니다.");
                navigate("/");
            },
            onSettled: () => {
                queryClient.invalidateQueries(["userInfo", userID]);
            },
        }
    );
