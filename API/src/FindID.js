import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FindID() {
    const [tab, setTab] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [inputName, setInputName] = useState("");
    const [inputEmail, setinputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [result, setResult] = useState("");

    const regexEmail = /\S+@\S+\.\S+/;
    const [checkEmail, setCheckEmail] = useState(false);
    const [EmailCheckMessage, setEmailCheckMessage] = useState("");

    const navigate = useNavigate();

    const onTab = (e) => {
        // e.preventDefault();
        // const selectedTab = e.target.innerText.toLowerCase(); // email 또는 phone 구분
        setTab(e.target.innerText.toLowerCase() === "phone");
        setInputName("");
        setInputPhone("");
        setinputEmail("");
        setIsShow(false);
    };

    const onInputName = (event) => {
        setInputName(event.target.value);
    };
    const [checkPhone, setCheckPhone] = useState(false);
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
        const formattedValue = formatPhoneNumber(value);
        setInputPhone(formattedValue);
        // 전화번호가 010-1234-5678 형식인지 확인
        if (/^\d{3}-\d{4}-\d{4}$/.test(formattedValue)) {
            setCheckPhone(false); // 형식에 맞으면 오류 없음
        } else {
            setCheckPhone(true); // 형식이 틀리면 오류 있음
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
    const onFind = () => {
        if (!inputName.trim() || (tab ? !inputPhone.trim() : !inputEmail.trim())) {
            alert("정보를 입력해주세요.");
            setInputName("");
            tab ? setInputPhone("") : setinputEmail("");
            return;
        }
        const userData = {
            name: inputName,
            contact: tab ? inputPhone : inputEmail,
            type: tab ? "phone" : "email",
        };

        fetch("http://localhost:3001/findid", {
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
                    setResult(`result : ${json?.message[0]?.id} `);
                } else {
                    setResult(`result : ${json?.message} `);
                }
                setIsShow(true);
            })
            .catch((error) => {
                console.error("오류:", error);
                alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
                navigate("/");
            });
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
/*
페이지 리로드를 막는 방법
button 타입 명시 :  <button type="button" onClick={onFind}></button>
또는
event.preventDefault()를 호출
만약 버튼이 폼 제출 버튼(type="submit") 역할을 하지 않는다면 방법 2처럼 type="button"을 명시하는 것이 더 직관적입니다.
-> 이 경우 type="submit"을 적용하면 페이지 리로드가 발생한다.
-> 리로드를 막으려면 onSubmit 이벤트 + event.preventDefault()를 넣어줘야한다.
*/
