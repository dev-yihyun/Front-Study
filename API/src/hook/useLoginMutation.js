import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const useLoginMutation = (inputID, setInputID, setInputPW) => {
    const navigate = useNavigate();
    return useMutation((userData) => axios.post("http://localhost:3001/login", userData), {
        onSuccess: (response) => {
            const { data } = response;
            if (!data || typeof data.success === "undefined") {
                throw new Error("서버 응답이 올바르지 않습니다.");
            }

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userID", inputID);
                alert(data.message || "로그인 성공");
                navigate("/main");
            }
        },
        onError: (error) => {
            console.error("로그인 오류 : ", error);
            alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            navigate("/");
        },
    });
};

export default useLoginMutation;
