import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataSetState } from "../atoms";

const Edit = () => {
    const { id } = useParams(); // URL에서 id를 가져옴
    const [userDataSet, setUserDataSet] = useRecoilState(userDataSetState);
    const navigate = useNavigate();

    const user = userDataSet.find((user) => user.id === id);

    const handleNicknameChange = (e) => {
        const updatedUserDataSet = userDataSet.map((user) =>
            user.id === id ? { ...user, nickname: e.target.value } : user
        );
        setUserDataSet(updatedUserDataSet);
    };

    return (
        <div>
            <h1>{user?.id} 편집</h1>
            <label>닉네임: </label>
            <input type="text" value={user?.nickname || ""} onChange={handleNicknameChange} />
            <br />
            <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
        </div>
    );
};

export default Edit;
