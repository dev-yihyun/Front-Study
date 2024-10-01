import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userDataSetState } from "../recoilState";

function Create() {
    const [formData, setFormData] = useState({
        id: "",
        email: "",
        phone: "",
        nickname: "",
        value: 0,
    });

    const setUserDataSet = useSetRecoilState(userDataSetState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "value" ? Number(value) : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserDataSet((oldUserDataSet) => [...oldUserDataSet, formData]);
        navigate("/"); // 홈으로 리다이렉트
    };

    return (
        <div>
            <h1>새 사용자 생성</h1>
            <form onSubmit={handleSubmit}>
                <label>ID:</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} required />
                <br />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Phone:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
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

                <label>Value:</label>
                <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    required
                />
                <br />

                <button type="submit">추가</button>
            </form>
        </div>
    );
}

export default Create;
