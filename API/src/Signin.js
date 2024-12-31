import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "./function/formatPhoneNumber";
import { useCheckIDAvailability } from "./hook/useCheckIDAvailability";
import { useInsertUser } from "./hook/useInsertUser";
import "./index.css";

function Signin() {
    const [inputID, setInputID] = useState("");
    const [validationID, setValidationID] = useState(false);
    const [idCheck, setIDCheck] = useState(false);
    const [idCheckMessage, setIDCheckMessage] = useState("");

    const [inputPW, setInputPW] = useState("");
    const [validationPW, setValidationPW] = useState(false);

    const [inputEmail, setInputEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);
    const [EmailCheckMessage, setEmailCheckMessage] = useState("");

    const [inputName, setInputName] = useState("");

    const [inputPhone, setInputPhone] = useState("");
    const [checkPhone, setCheckPhone] = useState(false);

    const regexID = /^[a-zA-Z0-9]*$/;
    const regexPW = /^[a-zA-Z0-9!@#$%^&*+\-=_?]*$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const navigate = useNavigate();

    const userData = () => ({
        inputID,
        inputPW,
        inputName,
        inputPhone,
        inputEmail,
    });

    const onInputId = (event) => {
        setInputID(event.target.value);
        setValidationID(!regexID.test(event.target.value));
        setIDCheck(false);
        setIDCheckMessage("");
    };

    const onInputPW = (event) => {
        setInputPW(event.target.value);
        setValidationPW(!regexPW.test(event.target.value));
    };

    const onInputName = (event) => {
        setInputName(event.target.value);
    };

    const onInputPhone = (event) => {
        const value = event.target.value;
        const formattedValue = formatPhoneNumber(value);
        setInputPhone(formattedValue);
        setCheckPhone(!/^\d{3}-\d{4}-\d{4}$/.test(formattedValue));
    };

    const onInputEmail = (event) => {
        const value = event.target.value;
        setInputEmail(value);
        setCheckEmail(!regexEmail.test(value));
        setEmailCheckMessage(regexEmail.test(value) ? "" : "이메일 주소가 정확한지 확인해 주세요.");
    };

    const { mutate: checkIDAvailability, isLoading: isCheckingID } = useCheckIDAvailability(
        (data) => {
            if (data.success) {
                setIDCheck(true);
                setIDCheckMessage("사용 가능한 아이디입니다.");
            } else {
                setIDCheck(false);
                setIDCheckMessage("사용할 수 없는 아이디입니다.");
            }
        },
        () => {
            setIDCheck(false);
            setIDCheckMessage("ID 확인 중 오류가 발생했습니다.");
        }
    );

    const { mutate: insertUser, isLoading: isSigningUp } = useInsertUser(
        userData,
        (data) => {
            alert(data.message);
            if (data.success) {
                navigate("/");
            }
        },
        (error) => {
            console.error("오류:", error);
            alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
    );

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
                        type="button"
                        onClick={() => checkIDAvailability()}
                        disabled={!inputID.trim() || validationID || isCheckingID}
                    >
                        {isCheckingID ? "검사 중..." : "아이디 중복 검사"}
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
                    onClick={() => insertUser()}
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
                        checkPhone ||
                        isSigningUp
                    }
                >
                    {isSigningUp ? "회원가입 중..." : "회원가입"}
                </button>
            </form>
        </>
    );
}

export default Signin;
