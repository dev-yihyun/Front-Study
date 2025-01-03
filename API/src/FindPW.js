import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../src/function/formatPhoneNumber";
import { useFindPassword } from "../src/hook/useFindPassword";
import { useResetPassword } from "../src/hook/useResetPassword";

function FindPW() {
    const [inputID, setInputID] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [isShow, setIsShow] = useState(false);

    const [validationPasswordResult, setValidationPasswordResult] = useState(false);
    const [passwordResultMessage, setPasswordResultMessage] = useState("");

    const [password, setPassword] = useState("");
    const [checkpassword, setCheckPassword] = useState("");
    const [validationPW, setvalidationPW] = useState(false);
    const [validationResetPW, setvalidationCheckPW] = useState(false);
    const [pwResult, setPWResult] = useState(false);

    const [checkEmail, setCheckEmail] = useState(false);
    const [EmailCheckMessage, setEmailCheckMessage] = useState("");
    const [checkPhone, setCheckPhone] = useState(false);

    const regexPW = /^[a-zA-Z0-9!@#$%^&*+\-=_?]*$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const navigate = useNavigate();

    const onInputID = (event) => {
        setInputID(event.target.value);
    };

    const onInputName = (event) => {
        setInputName(event.target.value);
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
        const value = event.target.value;
        setInputEmail(value);
        setCheckEmail(!regexEmail.test(value));
        setEmailCheckMessage(regexEmail.test(value) ? "" : "이메일 주소가 정확한지 확인해 주세요.");
    };

    const findPasswordMutation = useFindPassword(
        (data) => {
            if (data.success) {
                setIsShow(true);
                setPWResult(true);
            } else {
                setIsShow(true);
                setPWResult(false);
            }
        },
        () => {
            alert("서버 요청 중 오류가 발생했습니다.");
        }
    );

    const onFind = () => {
        const userData = {
            inputID: inputID,
            inputName: inputName,
            inputPhone: inputPhone,
            inputEmail: inputEmail,
        };
        findPasswordMutation.mutate(userData);
    };

    const validationPassword = (newPassword, newCheckPassword) => {
        if (newPassword !== newCheckPassword) {
            setValidationPasswordResult(true);
            setPasswordResultMessage("비밀번호가 일치하지 않습니다.");
        } else if (newPassword && regexPW.test(newPassword)) {
            setValidationPasswordResult(false);
            setPasswordResultMessage("비밀번호가 일치합니다!");
        } else {
            setValidationPasswordResult(false);
            setPasswordResultMessage("");
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
    const resetPasswordMutation = useResetPassword(
        (data) => {
            if (data.success) {
                alert("비밀번호가 성공적으로 변경되었습니다. 로그인 화면으로 돌아갑니다.");
                navigate("/");
            } else {
                alert("비밀번호 변경에 실패했습니다.");
                navigate("/");
            }
        },
        () => {
            alert("서버 오류가 발생했습니다.");
            navigate("/");
        }
    );
    const onRestPassword = () => {
        const userData = {
            inputID: inputID,
            password: password,
        };

        resetPasswordMutation.mutate(userData);
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
