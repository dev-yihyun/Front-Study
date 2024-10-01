import React, { useState } from "react";

function Test() {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    // 두 input의 값이 모두 채워졌을 때 저장 버튼 활성화
    const isSaveEnabled = input1.trim() !== "" && input2.trim() !== "";

    return (
        <div>
            <div>
                <label>Input 1:</label>
                <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
            </div>
            <div>
                <label>Input 2:</label>
                <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
            </div>
            <div>
                <button>취소</button>
                <button disabled={!isSaveEnabled}>저장</button> {/* 조건에 따라 활성화 */}
            </div>
        </div>
    );
}

export default Test;
