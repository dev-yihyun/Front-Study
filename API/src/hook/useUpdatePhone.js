import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const useUpdatePhone = (userID) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const updatePhoneMutation = useMutation(
        (newPhone) =>
            fetch("http://localhost:3001/phoneupdate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPhone),
            }).then((res) => {
                if (!res.ok) throw new Error("전화번호 변경 실패");
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                    alert("전화번호가 성공적으로 변경되었습니다. 메인 화면으로 돌아갑니다.");
                    navigate("/main");
                } else {
                    alert("전화번호 수정에 실패했습니다.");
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

    return updatePhoneMutation;
};
