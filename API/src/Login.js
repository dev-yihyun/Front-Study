import { useState } from "react";
import { Link } from "react-router-dom";
import useLoginMutation from "./hook/useLoginMutation";
import "./index.css";
function Login() {
    const [inputID, setInputID] = useState("");
    const [inputPW, setInputPW] = useState("");
    const loginMutation = useLoginMutation(inputID, setInputID, setInputPW);

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
