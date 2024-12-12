import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function MyPage() {
    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();
    // const queryClient = useQueryClient();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // 'YYYY-MM-DD HH:MM:SS' 형식으로 포맷
        const formattedDate =
            date.toLocaleDateString("ko-KR") +
            " " +
            date.toLocaleTimeString("ko-KR", { hour12: false });
        return formattedDate;
    };

    // Fetch user info using react-query
    const {
        data: userInfoData,
        isLoading,
        isError,
    } = useQuery(
        ["userInfo", userID],
        () =>
            fetch("http://localhost:3001/mypage", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ userID }),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            }),
        {
            enabled: !!userID, // Only run query if userID exists
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        }
    );

    if (isLoading) return <p>데이터를 불러오는 중...</p>;
    if (isError) {
        alert("네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        navigate("/");
        return null;
    }
    return (
        <>
            <Link to="/main">홈</Link>
            <h1>MyPage</h1>
            <div>
                {userInfoData ? (
                    <>
                        <p> 이름 : {userInfoData.message.name}</p>
                        <p> 아이디 : {userInfoData.message.id}</p>
                        <p>이메일 : {userInfoData.message.email}</p>
                        <p>전화번호 : {userInfoData.message.phone}</p>
                        <p>가입시기: {formatDate(userInfoData.message.insertdate)}</p>
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
