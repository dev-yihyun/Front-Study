import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const useUpdateEmail = (userID) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const updateEmailMutation = useMutation(
        (newEmail) =>
            fetch("http://localhost:3001/emailupdate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEmail),
            }).then((res) => {
                if (!res.ok) throw new Error("이메일 변경 실패");
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                    alert("이메일이 성공적으로 변경되었습니다. 메인 화면으로 돌아갑니다.");
                    navigate("/main");
                } else {
                    alert("이메일 수정에 실패했습니다.");
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

    return updateEmailMutation;
};
