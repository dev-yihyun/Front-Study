import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FindPW() {
    const [inputID, setInputID] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputEmail, setinputEmail] = useState("");
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

    const onInputID = (event) => {
        setInputID(event.target.value);
    };
    const onInputName = (event) => {
        setInputName(event.target.value);
    };

    const [checkPhone, setCheckPhone] = useState(false);
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
        const formattedValue = formatPhoneNumber(value);
        setInputPhone(formattedValue);
        // 전화번호가 010-1234-5678 형식인지 확인
        if (/^\d{3}-\d{4}-\d{4}$/.test(formattedValue)) {
            setCheckPhone(false); // 형식에 맞으면 오류 없음
        } else {
            setCheckPhone(true); // 형식이 틀리면 오류 있음
        }
    };

    const regexEmail = /\S+@\S+\.\S+/;
    const [checkEmail, setCheckEmail] = useState(false);
    const [EmailCheckMessage, setEmailCheckMessage] = useState("");
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
    const [pwResult, setPWResult] = useState(false);
    const onFind = () => {
        const userData = {
            inputID: inputID,
            inputName: inputName,
            inputPhone: inputPhone,
            inputEmail: inputEmail,
        };
        fetch("http://localhost:3001/findpw", {
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
                    setIsShow(true);
                    setPWResult(true);
                } else {
                    setIsShow(true);
                    setPWResult(false);
                }
            })
            .catch();
    };

    const [password, setPassword] = useState("");
    const [checkpassword, setCheckPassword] = useState("");
    const [validationPW, setvalidationPW] = useState(false);
    const [validationResetPW, setvalidationCheckPW] = useState(false);
    const regexPW = /^[a-zA-Z0-9!@#$%^&*+\-=_?]*$/;
    const validationPassword = (newPassword, newCheckPassword) => {
        if (newPassword !== newCheckPassword) {
            setValidationPasswordResult(true);
            setPasswordResultMessage("비밀번호가 일치하지 않습니다.");
        } else if (newPassword && regexPW.test(newPassword)) {
            setValidationPasswordResult(false);
            setPasswordResultMessage("비밀번호가 일치합니다!");
        } else {
            // 비밀번호 검증에서 일치하지 않는 경우 및 입력된 값이 비어있는 경우를 처리하기 위한 로직
            // 비밀번호 일치 여부가 명확하지 않을 때 초기 상태 제공
            /*
            - 비밀번호와 확인 비밀번호 중 하나라도 비어 있음
            - 비밀번호가 유효성 검사에 실패한 경우
            - 기본 초기화 상태로 돌려야 할 때
            */
            // 유효성 검사 초기화

            setValidationPasswordResult(false); // 비밀번호가 아직 올바르지 않다는 상태를 설정
            setPasswordResultMessage(""); // 사용자에게 보이는 메시지를 비움.
        }
    };
    const onPassword = (event) => {
        if (regexPW.test(event.target.value)) {
            setPassword(event.target.value);
            setvalidationPW("");
        } else {
            setvalidationPW(true);
        }
        validationPassword(event.target.value, checkpassword);
    };
    const onCheckPassword = (event) => {
        if (regexPW.test(event.target.value)) {
            setCheckPassword(event.target.value);
            setvalidationCheckPW("");
        } else {
            setvalidationCheckPW(true);
        }
        validationPassword(password, event.target.value);
    };
    const [validationPasswordResult, setValidationPasswordResult] = useState(false);
    const [passwordResultMessage, setPasswordResultMessage] = useState("");

    // const validationPassword = () => {
    //     if (password !== checkpassword) {
    //         setValidationPasswordResult(false);
    //         setPasswordResultMessage("비밀번호가 일치하지 않습니다.");
    //     } else if (password === checkpassword) {
    //         setValidationPasswordResult(true);
    //         setPasswordResultMessage("");
    //     }
    // };
    const onRestPassword = () => {
        const userData = {
            inputID: inputID,
            password: password,
        };

        fetch("http://localhost:3001/resetpassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("비밀번호 변경 실패");
                return res.json();
            })
            .then((json) => {
                if (json.success) {
                    alert("비밀번호가 성공적으로 변경되었습니다. 로그인 화면으로 돌아갑니다.");
                    navigate("/");
                } else {
                    alert("비밀번호 변경에 실패했습니다.");
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("서버 오류가 발생했습니다.");
                navigate("/");
            });
    };

    return (
        <>
            <Link to="/">홈</Link>
            <div>
                <form>
                    <p>
                        <input
                            type="text"
                            placeholder="ID"
                            maxLength={20}
                            value={inputID}
                            onChange={onInputID}
                        />
                    </p>
                    <p>
                        <input
                            type="text"
                            placeholder="NAME"
                            maxLength={20}
                            value={inputName}
                            onChange={onInputName}
                        />
                    </p>
                    <p>
                        <input
                            type="tel"
                            placeholder="PHONE"
                            maxLength={13}
                            value={inputPhone}
                            onChange={onInputPhone}
                        />
                    </p>
                    {checkPhone && (
                        <p style={{ color: "red" }}>전화번호를 올바른 형식으로 입력해 주세요.</p>
                    )}
                    <p>
                        <input
                            type="email"
                            placeholder="EMAIL"
                            maxLength={45}
                            value={inputEmail}
                            onChange={onInputEmail}
                        />
                    </p>
                    <p style={{ color: !checkEmail ? "green" : "red" }}>{EmailCheckMessage}</p>
                    <p>
                        <button
                            type="button"
                            onClick={onFind}
                            disabled={
                                !inputID.trim() ||
                                !inputPhone.trim() ||
                                !inputEmail.trim() ||
                                checkEmail ||
                                checkPhone
                            }
                        >
                            FIND PW
                        </button>
                    </p>
                </form>
            </div>
            {isShow && (
                <div>
                    <form>
                        {pwResult ? (
                            <>
                                <p>
                                    <input
                                        type="password"
                                        placeholder="Reset Password"
                                        maxLength={20}
                                        value={password}
                                        onChange={onPassword}
                                    />
                                    {validationPW && (
                                        <>
                                            <p style={{ color: "red" }}>
                                                특수문자는 !@#$%^&*+\-=_? 만 입력 가능합니다.
                                            </p>
                                            <p style={{ color: "red" }}>
                                                영어, 숫자,특수문자만 입력 가능합니다.
                                            </p>
                                            <p style={{ color: "red" }}>
                                                최대 20자까지 입력 가능합니다.
                                            </p>
                                        </>
                                    )}
                                </p>
                                <p>
                                    <input
                                        type="password"
                                        placeholder="Check Password"
                                        maxLength={20}
                                        value={checkpassword}
                                        onChange={onCheckPassword}
                                    />
                                    {validationResetPW && (
                                        <div>
                                            <p style={{ color: "red" }}>
                                                특수문자는 !@#$%^&*+\-=_? 만 입력 가능합니다.
                                            </p>
                                            <p style={{ color: "red" }}>
                                                영어, 숫자,특수문자만 입력 가능합니다.
                                            </p>
                                            <p style={{ color: "red" }}>
                                                최대 20자까지 입력 가능합니다.
                                            </p>
                                        </div>
                                    )}
                                </p>
                                {validationPasswordResult && <p>{passwordResultMessage}</p>}
                                {/* 버튼을 클릭했을때  */}
                                {/* {validationPasswordResult ? (
                                        <p>{passwordResultMessage}</p>
                                    ) : (
                                        <p>{passwordResultMessage}</p>
                                    )} */}
                                {/* &&가 나타나지 않는 이유는? */}
                                <p>
                                    <button
                                        type="button"
                                        onClick={onRestPassword}
                                        disabled={
                                            !password.trim() ||
                                            !checkpassword.trim() ||
                                            validationPasswordResult
                                        }
                                    >
                                        Rest password
                                    </button>
                                </p>
                            </>
                        ) : (
                            <>
                                <p>계정을 찾을 수 없습니다.</p>
                                <button>Find ID</button>
                            </>
                        )}
                    </form>
                </div>
            )}
        </>
    );
}

export default FindPW;
