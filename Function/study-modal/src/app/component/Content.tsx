"use client";
import { useState } from "react";

type Props = {
    // onClose?: () => void;
    onClose?: (inputValue: string) => void;
};
function Content({ onClose }: Props) {
    const [inputValue, setInputValue] = useState("");
    const onInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleClose = () => {
        if (onClose) onClose(inputValue);
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                className="
            flex flex-col
            bg-white p-6 rounded-2xl shadow-lg w-96 relative"
            >
                <h2 className="text-xl font-bold mb-4">모달 제목</h2>
                <p className="mb-4">여기는 모달 내용입니다.</p>
                <input
                    value={inputValue}
                    className="border  border-gray-800"
                    onChange={onInputText}
                />
                <button
                    onClick={handleClose}
                    className="mt-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    닫기
                </button>
            </div>
        </div>
    );
}
export default Content;
