// hook/useDeleteUser.js
import { useMutation } from "react-query";

export const useDeleteUser = (userID, queryClient, navigate) =>
    useMutation(
        () =>
            fetch("http://localhost:3001/deleteuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userID }),
            }).then((res) => {
                if (!res.ok) throw new Error("회원 탈퇴 실패");
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                    alert("탈퇴가 완료되었습니다. 로그인화면으로 돌아갑니다.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userID");
                    navigate("/");
                } else {
                    alert("회원탈퇴에 실패했습니다. 메인으로 돌아갑니다.");
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
