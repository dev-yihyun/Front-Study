import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataSetState } from "../recoilState";

const EditUser = () => {
    const { id } = useParams(); // URL에서 사용자 id 가져오기
    const [userDataSet, setUserDataSet] = useRecoilState(userDataSetState);
    const [formData, setFormData] = useState({
        id: "",
        nickname: "",
        value: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const userToEdit = userDataSet.find((user) => user.id === id);
        if (userToEdit) {
            setFormData(userToEdit);
        }
    }, [id, userDataSet]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "value" ? Number(value) : value, // value는 숫자로 변환
        });
    };

    // 버튼 활성화 조건: 닉네임과 value가 공백이 아니며, value는 50-90 사이의 값이어야 함
    const isButtonDisabled =
        formData.nickname.trim() === "" || formData.value < 50 || formData.value > 90;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isButtonDisabled) {
            setUserDataSet((oldUserDataSet) =>
                oldUserDataSet.map((user) => (user.id === id ? formData : user))
            );
            navigate("/"); // 수정 후 홈으로 이동
        }
    };

    return (
        <div>
            <h1>{formData.nickname} 수정하기</h1>
            <form onSubmit={handleSubmit}>
                <label>ID:</label>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    readOnly // id는 수정 불가
                />
                <br />

                <label>Nickname:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Value (50-90):</label>
                <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    min={50}
                    max={90}
                    required
                />
                <br />

                <button type="submit" disabled={isButtonDisabled}>
                    수정 완료
                </button>
            </form>

            {/* 조건에 따른 경고 메시지 출력 */}
            {formData.nickname.trim() === "" && <p>닉네임은 공백일 수 없습니다.</p>}
            {(formData.value < 50 || formData.value > 90) && (
                <p>Value는 50에서 90 사이의 값이어야 합니다.</p>
            )}
        </div>
    );
};

export default EditUser;
