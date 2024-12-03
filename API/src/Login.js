import { useState } from "react";
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

        fetch("http://localhost:3001/login", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            })
            .then((json) => {
                if (!json || typeof json.success === "undefined") {
                    throw new Error("서버 응답이 올바르지 않습니다.");
                }
                if (json.success) {
                    alert(json.message);
                    navigate("/main");
                } else {
                    alert(json.message || "로그인 실패");
                }
            })
            .catch((error) => {
                console.error("오류:", error);
                alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
                navigate("/");
            });
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
