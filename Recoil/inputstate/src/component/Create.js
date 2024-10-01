import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../Data";

let id = 2;
function getId() {
    return id++;
}

function Create() {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [disabled, setDisabled] = useState(true); //버튼 비활성화
    const [dataList, setDataList] = useRecoilState(dataState);

    const handleFirstInputChange = (e) => {
        setInput1(e.target.value);
    };
    const handleSecondInputChange = (e) => {
        setInput2(e.target.value);
    };

    useEffect(() => {
        const input2Value = Number(input2);

        if (!input1.trim() || !input2.trim()) {
            setDisabled(true);
        } else if (isNaN(input2Value) || input2Value < 30 || input2Value > 500) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [input1, input2]);

    const onSave = (e) => {
        e.preventDefault();
        const data = {
            id: getId(),
            nickname: input1,
            customvalue: input2,
            unit: "단위",
        };
        setDataList((oldData) => [...oldData, data]);
        setInput1("");
        setInput2("");
        console.log(dataList);
    };

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
            <button disabled={disabled} onClick={onSave}>
                저장
            </button>
        </>
    );
}
export default Create;
