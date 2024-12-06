import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Signin() {
    const [inputID, setInputID] = useState("");
    const [inputPW, setInputPW] = useState("");
    const [validationID, setvalidationID] = useState(false);
    const [validationPW, setvalidationPW] = useState(false);

    const [idCheck, setIDCheck] = useState(false);
    const [idCheckMessage, setIDCheckMessage] = useState("");

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
        setIDCheckMessage("");
    };

    const onInputPW = (event) => {
        if (regexPW.test(event.target.value)) {
            setInputPW(event.target.value);
            setvalidationPW("");
        } else {
            setvalidationPW(true);
        }
    };
    const [inputName, setInputName] = useState("");
    const onInputName = (event) => {
        setInputName(event.target.value);
    };
    // 010 - 0000 - 0000
    const [inputPhone, setInputPhone] = useState("");
    // 전화번호 포맷팅 함수
    const formatPhoneNumber = (value) => {
        // 숫자만 남기기
        const cleaned = value.replace(/\D/g, "");
        // 포맷 적용: 010-1234-5678
        if (cleaned.length <= 3) {
            return cleaned; // 3자리 이하 그대로
        } else if (cleaned.length <= 7) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`; // 010-123
        } else {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`; // 010-1234-5678
        }
    };
    const onInputPhone = (event) => {
        const value = event.target.value;
        // 숫자만 남기기
        const numericValue = value.replace(/\D/g, "");
        // setInputPhone(numericValue);
        setInputPhone(formatPhoneNumber(value));
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
            inputName: inputName,
            inputPhone: inputPhone,
        };

        fetch("http://localhost:3001/signin", {
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
                    navigate("/");
                } else {
                    alert(json.message || "회원가입에 실패했습니다.");
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
                if (json.success) {
                    // alert("사용 가능한 아이디입니다.");
                    setIDCheck(true);
                    setIDCheckMessage("사용 가능한 아이디입니다.");
                } else {
                    // alert("사용할수 없는 아이디입니다.");
                    setIDCheck(false);
                    setIDCheckMessage("사용할수 없는 아이디입니다.");
                }
            })
            .catch((error) => {
                console.error("오류:", error);
                alert("중복 체크 중 오류가 발생했습니다. 메인으로 이동합니다.");
                setIDCheck(false);
                navigate("/");
            });
        e.preventDefault();
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
                        maxLength={20}
                        style={{
                            border: validationID ? "2px solid red" : "",
                        }}
                    />
                    <button
                        onClick={onCheckIDAvailability}
                        disabled={!inputID.trim() || validationID}
                    >
                        아이디 중복 검사
                    </button>
                </p>
                <p style={{ color: idCheck ? "green" : "red" }}>{idCheckMessage}</p>
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
                        maxLength={20}
                        style={{
                            border: validationPW ? "2px solid red" : "",
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
                <p>
                    NAME :
                    <input
                        type="text"
                        placeholder="NAME"
                        name="inputName"
                        value={inputName}
                        onChange={onInputName}
                        maxLength={20}
                    />
                </p>
                <p>
                    PHONE :
                    <input
                        type="tel"
                        placeholder="PHONE"
                        name="inputPhone"
                        value={inputPhone}
                        onChange={onInputPhone}
                        maxLength={13} // 010-1234-5678 기준 최대 길이 설정
                        // maxLength={11} // 01012345678 기준 최대 길이 설정
                    />
                </p>

                <button
                    type="button"
                    onClick={onInsertUserDB}
                    disabled={
                        !inputID.trim() ||
                        !inputPW.trim() ||
                        validationID ||
                        validationPW ||
                        !idCheck ||
                        !inputName ||
                        !inputPhone
                    }
                >
                    회원가입
                </button>
            </form>
        </>
    );
}

export default Signin;
