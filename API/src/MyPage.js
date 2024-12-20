import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function MyPage() {
    const userID = localStorage.getItem("userID");
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [inputEmail, setInputEmail] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [checkEmail, setCheckEmail] = useState(false);
    const [EmailCheckMessage, setEmailCheckMessage] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [checkpassword, setCheckPassword] = useState("");
    const regexPW = /^[a-zA-Z0-9!@#$%^&*+\-=_?]*$/;

    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const [validation, setValidation] = useState(false);

    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [inputPhone, setInputPhone] = useState("");
    const [checkPhone, setCheckPhone] = useState(false);
    const [phoneCheckMessage, setPhoneCheckMessage] = useState("");

    const onShowEmailInput = () => {
        setShowEmailInput(!showEmailInput);
        if (!showEmailInput && userInfoData) {
            setInputEmail(userInfoData.message.email);
            setCheckEmail(true);
            setEmailCheckMessage("");
        }
    };

    const onInputEmail = (event) => {
        setInputEmail(event.target.value);
        if (inputEmail.trim()) {
            setCheckEmail(true);
            setEmailCheckMessage("이메일 주소가 정확한지 확인해 주세요.");
        }
        if (regexEmail.test(inputEmail)) {
            setCheckEmail(false);
            setEmailCheckMessage("");
        } else {
            setCheckEmail(true);
            setEmailCheckMessage("이메일 주소가 정확한지 확인해 주세요.");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate =
            date.toLocaleDateString("ko-KR") +
            " " +
            date.toLocaleTimeString("ko-KR", { hour12: false });
        return formattedDate;
    };

    const {
        data: userInfoData,
        isLoading,
        isError,
    } = useQuery(
        ["userInfo", userID],
        () =>
            fetch("http://localhost:3001/mypage", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ userID }),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            }),
        {
            enabled: !!userID,
            staleTime: 5 * 60 * 1000,
        }
    );

    const updateEmailMutation = useMutation(
        (newEmail) =>
            fetch("http://localhost:3001/emailupdate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEmail),
            }).then((res) => {
                if (!res.ok) throw new Error("이메일 변경 실패");
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                    alert("이메일이 성공적으로 변경되었습니다. 로그인 화면으로 돌아갑니다.");
                    navigate("/main");
                } else {
                    alert("이메일 수정에 실패했습니다.");
                }
            },
            onError: (error) => {
                console.error(error);
                alert("서버 오류가 발생했습니다.");
                navigate("/");
            },
            onSettled: () => {
                queryClient.invalidateQueries(["userInfo", userID]);
            },
        }
    );

    const onSaveEmail = () => {
        updateEmailMutation.mutate({
            userID: userID,
            inputEmail: inputEmail,
        });
    };
    const onEmailCancel = () => {
        if (userInfoData) {
            setInputEmail(userInfoData.message.email);
        }
        setShowEmailInput(false);
    };

    useEffect(() => {
        if (userInfoData) {
            setInputEmail(userInfoData.message.email);
            setInputPhone(userInfoData?.message?.phone);
        }
    }, [userInfoData]);

    const updatePhoneMutation = useMutation(
        (newPhone) =>
            fetch("http://localhost:3001/phoneupdate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPhone),
            }).then((res) => {
                if (!res.ok) throw new Error("이메일 변경 실패");
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                    alert("전화번호가 성공적으로 변경되었습니다. 메인으로 돌아갑니다.");
                    navigate("/main");
                } else {
                    alert("전화번호 수정에 실패했습니다.");
                }
            },
            onError: (error) => {
                console.error(error);
                alert("서버 오류가 발생했습니다.");
                navigate("/");
            },
            onSettled: () => {
                queryClient.invalidateQueries(["userInfo", userID]);
            },
        }
    );

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

    const onShowPhoneInput = () => {
        setShowPhoneInput(!showPhoneInput);
        if (!showPhoneInput && userInfoData) {
            setInputPhone(userInfoData?.message?.phone);
            setCheckPhone(true);
            setPhoneCheckMessage("");
        }
    };

    const onPhoneCancel = () => {
        if (userInfoData) {
            setInputPhone(userInfoData?.message?.phone);
        }
        setShowPhoneInput(false);
    };

    const onInputPhone = (event) => {
        const value = event.target.value;
        const formattedValue = formatPhoneNumber(value);
        setInputPhone(formattedValue);
        if (inputPhone.trim()) {
            setCheckPhone(true);
            setPhoneCheckMessage("전화번호를 정확하게 입력해 주세요.");
        }
        if (/^\d{3}-\d{4}-\d{4}$/.test(formattedValue)) {
            setCheckPhone(false);
            setPhoneCheckMessage("");
        } else {
            setCheckPhone(true);
            setPhoneCheckMessage("전화번호를 올바른 형식으로 입력해 주세요.");
        }
    };

    const onSavePhone = () => {
        updatePhoneMutation.mutate({
            userID: userID,
            inputPhone: inputPhone,
        });
    };

    const onCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    };

    const validationPassword = (newPassword, newCheckPassword) => {
        if (newPassword !== newCheckPassword) {
            setValidation(true);
            setPasswordErrorMessage("비밀번호가 일치하지 않습니다.");
        } else if (newPassword && regexPW.test(newPassword)) {
            setValidation(false);
            setPasswordErrorMessage("");
        } else {
            setValidation(false);
            setPasswordErrorMessage("");
        }
    };

    const onPassword = (event) => {
        if (regexPW.test(event.target.value)) {
            setPassword(event.target.value);
            setValidation("");
        } else {
            setValidation(true);
        }
        validationPassword(event.target.value, checkpassword);
    };

    const onCheckPassword = (event) => {
        if (regexPW.test(event.target.value)) {
            setCheckPassword(event.target.value);
            setValidation("");
        } else {
            setValidation(true);
        }
        validationPassword(password, event.target.value);
    };

    const userCheck = useMutation(
        (userData) =>
            fetch("http://localhost:3001/login", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                } else {
                    alert("현재 비밀번호가 맞지 않습니다.");
                }
            },
            onError: (error) => {
                console.error(error);
                alert("서버 오류가 발생했습니다.");
                navigate("/");
            },
            onSettled: () => {
                queryClient.invalidateQueries(["userInfo", userID]);
            },
        }
    );

    const updatePasswordMutation = useMutation(
        (newPassword) =>
            fetch("http://localhost:3001/resetpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword),
            }).then((res) => {
                if (!res.ok) throw new Error("비밀번호 변경 실패");
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                    alert("비밀번호가 성공적으로 변경되었습니다. 로그인 후 접속해 주세요.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userID");
                    navigate("/");
                } else {
                    alert("비밀번호 수정에 실패했습니다. 메인으로 돌아갑니다.");
                    navigate("/main");
                }
            },
            onError: (error) => {
                console.error(error);
                alert("서버 오류가 발생했습니다.");
                navigate("/");
            },
            onSettled: () => {
                queryClient.invalidateQueries(["userInfo", userID]);
            },
        }
    );

    const onRestPassword = () => {
        if (password === checkpassword) {
            userCheck.mutate(
                {
                    inputID: userID,
                    inputPW: currentPassword,
                },
                {
                    onSuccess: (data) => {
                        if (data.success) {
                            updatePasswordMutation.mutate({
                                inputID: userID,
                                password: password,
                            });
                        } else {
                            alert("현재 비밀번호가 맞지 않습니다.");
                            setPasswordErrorMessage("현재 비밀번호가 맞지 않습니다.");
                        }
                    },
                    onError: (error) => {
                        console.error(error);
                        alert("비밀번호 확인 중 오류가 발생했습니다.");
                    },
                }
            );
        } else {
            alert("비밀번호가 맞지 않습니다.");
        }
    };

    const deleteUser = useMutation(
        (deleteUser) =>
            fetch("http://localhost:3001/deleteuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(deleteUser),
            }).then((res) => {
                if (!res.ok) throw new Error("비밀번호 변경 실패");
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (data.success) {
                    alert("탈퇴가 완료되었습니다. 로그인화면으로 돌아갑니다.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userID");
                    navigate("/");
                } else {
                    alert("회원탈퇴에 실패했습니다. 메인으로 돌아갑니다.");
                    navigate("/main");
                }
            },
            onError: (error) => {
                console.error(error);
                alert("서버 오류가 발생했습니다.");
                navigate("/");
            },
            onSettled: () => {
                queryClient.invalidateQueries(["userInfo", userID]);
            },
        }
    );

    const onDelete = () => {
        deleteUser.mutate({
            userID: userID,
        });
    };

    if (isLoading) return <p>데이터를 불러오는 중...</p>;

    if (isError) {
        alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        navigate("/");
        return null;
    }

    return (
        <>
            <Link to="/main">홈</Link>
            <h1>MyPage</h1>
            <div>
                {userInfoData ? (
                    <>
                        <p> 이름 : {userInfoData.message.name} </p>
                        <p> 아이디 : {userInfoData.message.id} </p>
                        <div>
                            이메일 :
                            {showEmailInput ? (
                                <>
                                    <input
                                        type="email"
                                        value={inputEmail}
                                        onChange={onInputEmail}
                                    />
                                    <button
                                        type="button"
                                        onClick={onSaveEmail}
                                        disabled={!inputEmail.trim() || checkEmail}
                                    >
                                        저장
                                    </button>
                                    <button type="button" onClick={onEmailCancel}>
                                        취소
                                    </button>{" "}
                                    <p style={{ color: !checkEmail ? "green" : "red" }}>
                                        {EmailCheckMessage}
                                    </p>
                                </>
                            ) : (
                                <>
                                    {userInfoData.message.email}
                                    <button type="button" onClick={onShowEmailInput}>
                                        수정
                                    </button>
                                </>
                            )}
                        </div>
                        <div>
                            전화번호 :
                            {showPhoneInput ? (
                                <>
                                    <input
                                        type="tel"
                                        value={inputPhone}
                                        onChange={onInputPhone}
                                        maxLength={13}
                                    />
                                    <button
                                        type="button"
                                        disabled={!inputPhone.trim() || checkPhone}
                                        onClick={onSavePhone}
                                    >
                                        저장
                                    </button>
                                    <button type="button" onClick={onPhoneCancel}>
                                        취소
                                    </button>
                                    <p style={{ color: !checkPhone ? "green" : "red" }}>
                                        {phoneCheckMessage}
                                    </p>
                                </>
                            ) : (
                                <>
                                    {userInfoData.message.phone}
                                    <button type="button" onClick={onShowPhoneInput}>
                                        수정
                                    </button>
                                </>
                            )}
                        </div>
                        <p> 가입시기: {formatDate(userInfoData.message.insertdate)} </p>
                    </>
                ) : (
                    <p>데이터를 불러오는 중...</p>
                )}
            </div>
            <hr />
            <div>
                <h3>비밀번호 변경</h3>
                <form>
                    <p>
                        현재 비밀번호 :{" "}
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={onCurrentPassword}
                        />
                    </p>
                    <p>
                        변경할 비밀번호 :{" "}
                        <input
                            type="password"
                            placeholder="Reset Password"
                            maxLength={20}
                            value={password}
                            onChange={onPassword}
                        />
                    </p>
                    <p>
                        비밀번호 확인 :{" "}
                        <input
                            type="password"
                            placeholder="Check Password"
                            maxLength={20}
                            value={checkpassword}
                            onChange={onCheckPassword}
                        />
                    </p>
                    {validation && (
                        <>
                            <p style={{ color: "red" }}>
                                특수문자는 !@#$%^&*+\-=_? 만 입력 가능합니다.
                            </p>
                            <p style={{ color: "red" }}>영어, 숫자,특수문자만 입력 가능합니다.</p>
                            <p style={{ color: "red" }}>최대 20자까지 입력 가능합니다.</p>
                        </>
                    )}
                    <p style={{ color: "red" }}>{passwordErrorMessage}</p>

                    <p>
                        <button type="button" onClick={onRestPassword}>
                            비밀번호 변경
                        </button>
                    </p>
                </form>
            </div>
            <hr />
            <div>
                <button type="button" onClick={onDelete}>
                    회원 탈퇴
                </button>
            </div>
        </>
    );
}

export default MyPage;
