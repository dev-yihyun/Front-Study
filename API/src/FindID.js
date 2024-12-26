import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function FindID() {
    const [tab, setTab] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const [inputName, setInputName] = useState("");

    const [inputEmail, setInputEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);
    const [EmailCheckMessage, setEmailCheckMessage] = useState("");
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [inputPhone, setInputPhone] = useState("");
    const [checkPhone, setCheckPhone] = useState(false);
    const [result, setResult] = useState("");

    const navigate = useNavigate();

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

    const mutation = useMutation(
        (userData) =>
            fetch("http://localhost:3001/findid", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userData),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            }),
        {
            onSuccess: (data) => {
                if (!data || typeof data.success === "undefined") {
                    throw new Error("서버 응답이 올바르지 않습니다.");
                }
                if (data.success) {
                    setResult(`result : ${data?.message[0]?.id} `);
                } else {
                    setResult(`result : ${data?.message} `);
                }
                setIsShow(true);
            },
            onError: (error) => {
                console.error("오류:", error);
                alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
                navigate("/");
            },
        }
    );

    const onTab = (e) => {
        setTab(e.target.innerText.toLowerCase() === "phone");
        setInputName("");
        setInputPhone("");
        setInputEmail("");
        setIsShow(false);
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

    const onFind = () => {
        if (!inputName.trim() || (tab ? !inputPhone.trim() : !inputEmail.trim())) {
            alert("정보를 입력해주세요.");
            setInputName("");
            tab ? setInputPhone("") : setInputEmail("");
            return;
        }
        const userData = {
            name: inputName,
            contact: tab ? inputPhone : inputEmail,
            type: tab ? "phone" : "email",
        };
        mutation.mutate(userData);
    };

    return (
        <>
            <Link to="/">홈</Link>
            <p>
                <button type="button" onClick={onTab}>
                    email
                </button>
                <button type="button" onClick={onTab}>
                    phone
                </button>
            </p>
            <form>
                <p>
                    <input
                        type="text"
                        placeholder="name"
                        maxLength={20}
                        value={inputName}
                        onChange={onInputName}
                    />
                </p>

                {tab ? (
                    <>
                        <p>
                            <input
                                type="tel"
                                placeholder="phone"
                                maxLength={13}
                                value={inputPhone}
                                onChange={onInputPhone}
                            />
                        </p>
                        {checkPhone && (
                            <p style={{ color: "red" }}>
                                전화번호를 올바른 형식으로 입력해 주세요.
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <p>
                            <input
                                type="email"
                                placeholder="email"
                                maxLength={45}
                                value={inputEmail}
                                onChange={onInputEmail}
                            />
                        </p>
                        <p style={{ color: !checkEmail ? "green" : "red" }}>{EmailCheckMessage}</p>
                    </>
                )}
                <button
                    type="button"
                    onClick={onFind}
                    disabled={
                        !inputName.trim() ||
                        (tab ? !inputPhone.trim() : !inputEmail.trim()) ||
                        checkEmail ||
                        checkPhone
                    }
                >
                    find
                </button>
            </form>
            {isShow && <div> {result}</div>}
        </>
    );
}

export default FindID;
