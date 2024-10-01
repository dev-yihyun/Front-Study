import React, { useState } from "react";

function Test1() {
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");

    // 첫번째 input 핸들러
    const handleFirstInputChange = (e) => {
        setFirstInput(e.target.value);
    };

    // 두번째 input 핸들러
    const handleSecondInputChange = (e) => {
        setSecondInput(e.target.value);
    };

    // 버튼 비활성화 조건
    const isButtonDisabled = () => {
        // 첫 번째 input이 공백이거나 두 번째 input이 공백
        if (!firstInput.trim() || !secondInput.trim()) {
            return true;
        }

        const secondValue = Number(secondInput);
        // 두 번째 input 값이 30 ~ 500 사이의 숫자가 아닌 경우
        if (isNaN(secondValue) || secondValue < 30 || secondValue > 500) {
            return true;
        }

        return false;
    };

    const handleClick = () => {
        alert(`첫 번째 값: ${firstInput}, 두 번째 값: ${secondInput}`);
    };

    return (
        <div>
            <input
                type="text"
                value={firstInput}
                onChange={handleFirstInputChange}
                placeholder="첫 번째 값을 입력하세요"
            />
            <br />
            <input
                type="text"
                value={secondInput}
                onChange={handleSecondInputChange}
                placeholder="두 번째 값을 입력하세요 (숫자)"
            />
            <br />
            <button
                onClick={handleClick}
                disabled={isButtonDisabled()} // 버튼 비활성화 조건 적용
            >
                확인
            </button>
        </div>
    );
}

export default Test1;
