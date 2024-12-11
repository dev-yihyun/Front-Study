import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function MyPage() {
    const userID = localStorage.getItem("userID");
    const [userInfoData, setUerInfoData] = useState();
    const navigate = useNavigate();

    console.log("##userID", userID);
    console.log("##userInfoData", userInfoData);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // 'YYYY-MM-DD HH:MM:SS' 형식으로 포맷
        const formattedDate =
            date.toLocaleDateString("ko-KR") +
            " " +
            date.toLocaleTimeString("ko-KR", { hour12: false });
        return formattedDate;
    };
    const userInfo = () => {
        fetch("http://localhost:3001/mypage", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ userID: userID }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            })
            .then((json) => {
                if (!json || typeof json.success === "undefined") {
                    throw new Error("서버 응답이 올바르지 않습니다.");
                }
                if (json.success) {
                    setUerInfoData(json.message);
                } else {
                    setUerInfoData(`${json?.message}`);
                }
            })
            .catch((error) => {
                console.error("오류:", error);
                alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
                navigate("/");
            });
    };
    useEffect(() => {
        userInfo();
    }, []);
    return (
        <>
            <Link to="/main">홈</Link>
            <h1>MyPage</h1>
            <div>
                {userInfoData ? (
                    <>
                        <p> 이름 : {userInfoData.name}</p>
                        <p> 아이디 : {userInfoData.id}</p>
                        <p>이메일 : {userInfoData.email}</p>
                        <p>전화번호 : {userInfoData.phone}</p>
                        <p>가입시기: {formatDate(userInfoData.insertdate)}</p>
                    </>
                ) : (
                    <p>데이터를 불러오는 중...</p>
                )}
            </div>
            <hr />
            <div>
                <h3>비밀번호 변경</h3>
                <form>
                    <p>
                        현재 비밀번호 : <input type="password" />
                    </p>
                    <p>
                        변경할 비밀번호 : <input type="password" />
                    </p>
                    <p>
                        비밀번호 확인 : <input type="password" />
                    </p>
                    <p>
                        <button type="button">비밀번호 변경</button>
                    </p>
                </form>
            </div>
            <hr />
            <div>
                <button>회원 탈퇴</button>
            </div>
        </>
    );
}

export default MyPage;
