import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "./function/formatPhoneNumber";

import { useFindID } from "../src/hook/useFindID";

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

    const findID = useFindID(
        (data) => {
            if (data.success) {
                setResult(`result : ${data?.message[0]?.id} `);
            } else {
                setResult(`result : ${data?.message} `);
            }
            setIsShow(true);
        },
        (error) => {
            console.error("오류:", error);
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
        findID.mutate(userData);
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
