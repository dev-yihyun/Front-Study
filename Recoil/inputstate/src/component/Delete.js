import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dataState, selectDataState } from "../Data";
function Delete() {
    const [selectData, setSelectData] = useRecoilState(selectDataState);
    const [data, setData] = useRecoilState(dataState);
    //const [editedUser, setEditedUser] = useState(selectData);
    const navigate = useNavigate();
    // 입력값 변경 핸들러
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedUser((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };
    const handleChange = () => {};
    const onDelete = () => {
        const deleteData = data.filter((data) => data.id !== selectData.id);
        setData(deleteData);
        navigate("/"); // 메인 페이지로 이동
    };
    return (
        <>
            <input value={selectData.nickname} onChange={handleChange} />
            <br />
            {/* type을 숫자로 */}
            <input value={selectData.customvalue} onChange={handleChange} />
            <br />
            <button onClick={onDelete}>삭제</button>
            <button>수정</button>
        </>
    );
}

export default Delete;
