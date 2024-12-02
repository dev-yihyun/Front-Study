import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
// 입력 길이 제한
// 로딩기능
// 아이디유효성
// fetch-then-catch
function Signin() {
    const [inputID, setInputID] = useState("");
    const [inputPW, setInputPW] = useState("");
    const [validationID, setvalidationID] = useState(false);
    const [validationPW, setvalidationPW] = useState(false);

    const [idCheck, setIDCheck] = useState(false);

    const regexID = /^[a-zA-Z0-9]*$/;
    const regexPW = /^[a-zA-Z0-9!@#$%^&*+\-=_?]*$/;

    const navigate = useNavigate();

    const onInputId = (event) => {
        setInputID(event.target.value);
        if (regexID.test(event.target.value)) {
            setvalidationID("");
        } else {
            setvalidationID(true);
        }
        setIDCheck(false);
    };

    const onInputPW = (event) => {
        if (regexPW.test(event.target.value)) {
            setInputPW(event.target.value);
            setvalidationPW("");
        } else {
            setvalidationPW(true);
        }
    };

    const onInsertUserDB = () => {
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

        fetch("http://localhost:3001/signin", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => {
                // 응답 상태 코드 확인
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json(); // JSON 파싱
            })
            .then((json) => {
                if (!json || typeof json.success === "undefined") {
                    throw new Error("서버 응답이 올바르지 않습니다.");
                }
                if (json.success) {
                    alert(json.message); // 성공 메시지 표시
                    navigate("/"); // 메인 페이지로 이동
                } else {
                    alert(json.message || "회원가입에 실패했습니다.");
                }
            })
            .catch((error) => {
                console.error("오류:", error);
                alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            });
        setInputID("");
        setInputPW("");
    };
    const onCheckIDAvailability = (e) => {
        if (!inputID.trim()) {
            alert("아이디를 입력해 주세요");
            setIDCheck(false);
            return;
        }
        fetch("http://localhost:3001/idcheck", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ inputID: inputID }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            })
            .then((json) => {
                console.log("##json", json);
                if (json.success) {
                    alert("사용 가능한 아이디입니다.");
                    setIDCheck(true);
                    // setIdCheckMessage("사용 가능한 아이디입니다.");
                } else {
                    alert("사용할수 없는 아이디입니다.");
                    setIDCheck(false);
                    // setIdCheckMessage("이미 사용 중인 아이디입니다.");
                }
            })
            .catch((error) => {
                console.error("오류:", error);
                alert("중복 체크 중 오류가 발생했습니다. 메인으로 이동합니다.");
                setIDCheck(false);
                navigate("/"); // 메인 페이지로 이동
                // setIdCheckMessage("중복 체크 중 오류가 발생했습니다.");
                // setIsIDChecked(false);
            });
        e.preventDefault(); // 새로고침 방지
    };
    return (
        <>
            <p>
                <Link to="/">메인</Link>
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
                        maxLength={20} // 최대 길이 제한
                        style={{
                            border: validationID ? "2px solid red" : "", // 유효성 검사에 따라 border 색상 변경
                        }}
                    />
                    <button onClick={onCheckIDAvailability} disabled={!inputID.trim()}>
                        아이디 중복 검사
                    </button>
                </p>
                {idCheck ? (
                    <p style={{ color: "green" }}>사용 가능한 아이디입니다.</p>
                ) : (
                    <p style={{ color: "red" }}>사용할 수 없는 아이디입니다.</p>
                )}
                {validationID && (
                    <p style={{ color: "red" }}>
                        영어, 숫자만 입력 가능하며 최대 20자까지 입력 가능합니다.
                    </p>
                )}

                <p>
                    PW :
                    <input
                        type="password"
                        placeholder="PW"
                        name="inputPW"
                        value={inputPW}
                        onChange={onInputPW}
                        maxLength={20} // 최대 길이 제한
                        style={{
                            border: validationPW ? "2px solid red" : "", // 유효성 검사에 따라 border 색상 변경
                        }}
                    />
                </p>
                {validationPW && (
                    <>
                        <p style={{ color: "red" }}>
                            특수문자는 !@#$%^&*+\-=_? 만 입력 가능합니다.
                        </p>
                        <p style={{ color: "red" }}>영어, 숫자,특수문자만 입력 가능합니다.</p>
                        <p style={{ color: "red" }}>최대 20자까지 입력 가능합니다.</p>
                    </>
                )}

                <button
                    type="button"
                    onClick={onInsertUserDB}
                    disabled={
                        !inputID.trim() ||
                        !inputPW.trim() ||
                        validationID ||
                        validationPW ||
                        !idCheck
                    }
                >
                    회원가입
                </button>
            </form>
        </>
    );
}

export default Signin;
{
    /* <p>
                이메일 : <input type="email" />
            </p>
            <p>
                tel : <input type="tel" />
            </p>
            <p>
                이름 : <input type="text" />
            </p> */
}
