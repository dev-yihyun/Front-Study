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
    const regexEmail = /\S+@\S+\.\S+/;
    const [checkEmail, setCheckEmail] = useState(false);
    const [EmailCheckMessage, setEmailCheckMessage] = useState("");

    const onShowEmailInput = () => {
        setShowEmailInput(!showEmailInput);
        if (!showEmailInput && userInfoData) {
            // 이메일 입력창을 열 때 상태 초기화
            setInputEmail(userInfoData.message.email);
            setCheckEmail(true);
            setEmailCheckMessage("");
        }
    };

    const onInputEmail = (event) => {
        setInputEmail(event.target.value);
        if (inputEmail.trim()) {
            console.log("##공백");
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

    // Fetch user info using react-query
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
            enabled: !!userID, // Only run query if userID exists
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        }
    );

    // Update email mutation
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
                queryClient.invalidateQueries(["userInfo", userID]); // Invalidate cache to refresh user info
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
            // 이메일 입력창을 닫을 때 현재 이메일로 리셋
            setInputEmail(userInfoData.message.email);
        }
        setShowEmailInput(false);
    };

    useEffect(() => {
        console.log("##useEffect");
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

    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [inputPhone, setInputPhone] = useState("");
    const [checkPhone, setCheckPhone] = useState(false);
    const [phoneCheckMessage, setPhoneCheckMessage] = useState("");
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
        // 전화번호가 010-1234-5678 형식인지 확인
        if (inputPhone.trim()) {
            setCheckPhone(true);
            setPhoneCheckMessage("전화번호를 정확하게 입력해 주세요.");
        }
        if (/^\d{3}-\d{4}-\d{4}$/.test(formattedValue)) {
            setCheckPhone(false); // 형식에 맞으면 오류 없음
            setPhoneCheckMessage("");
        } else {
            setCheckPhone(true); // 형식이 틀리면 오류 있음
            setPhoneCheckMessage("전화번호를 올바른 형식으로 입력해 주세요.");
        }
    };
    const onSavePhone = () => {
        updatePhoneMutation.mutate({
            userID: userID,
            inputPhone: inputPhone,
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
                        현재 비밀번호 : <input type="password" />
                    </p>
                    <p>
                        변경할 비밀번호 : <input type="password" />
                    </p>
                    <p>
                        비밀번호 확인 : <input type="password" />
                    </p>
                    <p>
                        <button type="button">비밀번호 변경</button>
                    </p>
                </form>
            </div>
            <hr />
            <div>
                <button>회원 탈퇴</button>
            </div>
        </>
    );
}

export default MyPage;