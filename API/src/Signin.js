import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Signin() {
    const [inputID, setInputID] = useState("");
    const [validationID, setvalidationID] = useState(false);
    const [idCheck, setIDCheck] = useState(false);
    const [idCheckMessage, setIDCheckMessage] = useState("");

    const [inputPW, setInputPW] = useState("");
    const [validationPW, setvalidationPW] = useState(false);

    const [inputEmail, setinputEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);
    const [EmailCheckMessage, setEmailCheckMessage] = useState("");

    const [inputName, setInputName] = useState("");

    const [inputPhone, setInputPhone] = useState("");
    const [checkPhone, setCheckPhone] = useState(false);

    const regexID = /^[a-zA-Z0-9]*$/;
    const regexPW = /^[a-zA-Z0-9!@#$%^&*+\-=_?]*$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    const onInputName = (event) => {
        setInputName(event.target.value);
    };

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length <= 3) {
            return cleaned;
        } else if (cleaned.length <= 7) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        } else {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
        }
    };

    const onInputPhone = (event) => {
        const value = event.target.value;
        const formattedValue = formatPhoneNumber(value);
        setInputPhone(formattedValue);
        if (/^\d{3}-\d{4}-\d{4}$/.test(formattedValue)) {
            setCheckPhone(false);
        } else {
            setCheckPhone(true);
        }
    };

    const onInputEmail = (event) => {
        setinputEmail(event.target.value);

        if (regexEmail.test(inputEmail)) {
            setCheckEmail(false);
            setEmailCheckMessage("");
        } else {
            setCheckEmail(true);
            setEmailCheckMessage("이메일 주소가 정확한지 확인해 주세요.");
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
            inputName: inputName,
            inputPhone: inputPhone,
            inputEmail: inputEmail,
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
                    setIDCheck(true);
                    setIDCheckMessage("사용 가능한 아이디입니다.");
                } else {
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
                        maxLength={13}
                    />
                </p>
                {checkPhone && (
                    <p style={{ color: "red" }}>전화번호를 올바른 형식으로 입력해 주세요.</p>
                )}

                <p>
                    EMAIL :
                    <input
                        type="email"
                        placeholder="EMAIL"
                        name="inputEmail"
                        value={inputEmail}
                        onChange={onInputEmail}
                        maxLength={45}
                    />
                </p>
                <p style={{ color: !checkEmail ? "green" : "red" }}>{EmailCheckMessage}</p>
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
                        !inputPhone ||
                        !inputEmail ||
                        checkEmail ||
                        checkPhone
                    }
                >
                    회원가입
                </button>
            </form>
        </>
    );
}

export default Signin;
