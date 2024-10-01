import React, { useState } from "react";

function Card() {
    //const [disabled, setDisabled] = useState(true);
    // disabled true : 버튼비활성화
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    const disabled = input1.trim() !== "" && input2.trim() !== "";

    return (
        <>
            <input
                placeholder="닉네임"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
            />
            <br />
            {/* type을 숫자로 */}
            <input placeholder="숫자" value={input2} onChange={(e) => setInput2(e.target.value)} />
            <br />
            <button>취소</button>
            <button disabled={!disabled}>저장</button>
        </>
    );
}

export default Card;
