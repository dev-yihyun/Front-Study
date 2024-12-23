import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
function Login() {
    const [inputID, setInputID] = useState("");
    const [inputPW, setInputPW] = useState("");

    const navigate = useNavigate();

    const onInputId = (event) => {
        setInputID(event.target.value);
    };

    const onInputPW = (event) => {
        setInputPW(event.target.value);
    };

    const loginMutation = useMutation(
        (userData) => axios.post("http://localhost:3001/login", userData),
        {
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
                } else {
                    alert(data.message || "로그인 실패");
                }
            },
            onError: (error) => {
                console.error("오류:", error);
                alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
                navigate("/");
            },
        }
    );

    const onLogin = () => {
        if (!inputID.trim() || !inputPW.trim()) {
            alert("ID와 PW를 입력해주세요.");
            setInputID("");
            setInputPW("");
            return;
        }

        const userData = {
            inputID: inputID,
            inputPW: inputPW,
        };

        loginMutation.mutate(userData);

        setInputID("");
        setInputPW("");
    };

    return (
        <>
            <p>
                <Link to="/main">메인</Link>
            </p>
            <p>
                <Link to="/signin">회원가입</Link>
            </p>
            <p>
                <Link to="/findid">ID 찾기</Link>
            </p>
            <p>
                <Link to="/findpw">PW 찾기</Link>
            </p>
            <form>
                <p>
                    ID :
                    <input
                        type="text"
                        placeholder="ID"
                        name="inputID"
                        value={inputID}
                        onChange={onInputId}
                        maxLength={20}
                    />
                </p>
                <p>
                    PW :
                    <input
                        type="password"
                        placeholder="PW"
                        name="inputPW"
                        value={inputPW}
                        onChange={onInputPW}
                        maxLength={20}
                    />
                </p>
                <button type="button" onClick={onLogin}>
                    로그인
                </button>
            </form>
        </>
    );
}

export default Login;
