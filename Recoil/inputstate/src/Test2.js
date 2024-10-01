import React, { useEffect, useState } from "react";

function Test2() {
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");
    const [isDisabled, setIsDisabled] = useState(true); // 버튼 비활성화 상태를 위한 변수

    // 첫번째 input 핸들러
    const handleFirstInputChange = (e) => {
        setFirstInput(e.target.value);
    };

    // 두번째 input 핸들러
    const handleSecondInputChange = (e) => {
        setSecondInput(e.target.value);
    };

    // useEffect로 firstInput과 secondInput의 값이 변경될 때마다 버튼 비활성화 조건 체크
    useEffect(() => {
        const secondValue = Number(secondInput);

        // 첫 번째 input이 공백이거나 두 번째 input이 공백
        if (!firstInput.trim() || !secondInput.trim()) {
            setIsDisabled(true);
        }
        // 두 번째 input 값이 30 ~ 500 사이의 숫자가 아닌 경우
        else if (isNaN(secondValue) || secondValue < 30 || secondValue > 500) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [firstInput, secondInput]); // 첫 번째, 두 번째 input 값이 변할 때마다 체크

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
            <input
                type="text"
                value={secondInput}
                onChange={handleSecondInputChange}
                placeholder="두 번째 값을 입력하세요 (숫자)"
            />
            <button
                onClick={handleClick}
                disabled={isDisabled} // 버튼 비활성화 조건 변수 적용
            >
                확인
            </button>
        </div>
    );
}

export default Test2;
