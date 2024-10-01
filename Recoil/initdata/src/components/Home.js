import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataSetState } from "../atoms";

const Home = () => {
    const [userDataSet] = useRecoilState(userDataSetState);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userDataSet.length > 0) {
            setSelectedId(userDataSet[0].id); // 첫 번째 항목 선택
        }
    }, [userDataSet]);

    return (
        <div>
            <h1>사용자 목록</h1>
            <ul>
                {userDataSet.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => setSelectedId(user.id)}
                        style={{
                            cursor: "pointer",
                            backgroundColor: selectedId === user.id ? "lightgreen" : "white",
                        }}
                    >
                        {user.id}{" "}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // id 선택 방지
                                navigate(`/edit/${user.id}`); // 편집 화면으로 이동
                            }}
                        >
                            편집
                        </button>
                    </li>
                ))}
            </ul>

            {selectedId && (
                <div>
                    <h2>선택된 사용자 닉네임:</h2>
                    <p>{userDataSet.find((user) => user.id === selectedId)?.nickname}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
