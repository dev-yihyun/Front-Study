"use client";

import { useState } from "react";
import Content from "./Content";

function Component() {
    const [isOpen, setIsOpen] = useState(false);
    const [lastInput, setLastInput] = useState(""); // ⬅️ 입력값을 저장할 상태

    const handleClose = (inputValue: string) => {
        setLastInput(inputValue); // 입력값 저장
        setIsOpen(false); // 모달 닫기
        console.log("입력값:", inputValue); // 콘솔 확인용
    };
    console.log(lastInput);
    return (
        <div className="h-lvh flex flex-col items-center justify-center bg-gray-700">
            <div>
                <h1 className="text-4xl">컴포넌트 텍스트</h1>
                <p>모달창을 만들었습니다.</p>
                <p>UI 확인 테스트 중 입니다.</p>
                <h1>Text 입니다.</h1>
                <h1>Text 입니다.</h1>
                <h1>Text 입니다.</h1>
                <h1>Text 입니다.</h1>
            </div>
            <div>
                <h1 className="text-4xl">컴포넌트 텍스트</h1>
                <p>모달창을 만들었습니다.</p>
                <p>UI 확인 테스트 중 입니다.</p>
                <h1>Text 입니다.</h1>
                <h1>Text 입니다.</h1>
                <h1>Text 입니다.</h1>
                <h1>Text 입니다.</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
                >
                    click
                </button>

                {isOpen && <Content onClose={handleClose} />}
            </div>
        </div>
    );
}

export default Component;
