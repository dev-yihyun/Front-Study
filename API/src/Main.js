import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CampListBlock from "./CampListBlock";
const Button = styled.button`
    font-weight: ${(props) => (props.$active ? "bold" : "normal")};
    color: ${(props) => (props.$active ? "red" : "black")};
`;
function MainBlock() {
    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();
    const [campData, setCampData] = useState();
    const [totalData, setTotalData] = useState(0);
    const numOfRows = 10;
    const pageNo = useRef(1);
    const pageButtonNumber = 5;
    const [currentPageGroup, setCurrentPageGroup] = useState(0);

    const totalPage = Math.ceil(totalData / numOfRows);

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const API_URL = `https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=${numOfRows}&pageNo=${pageNo.current}&MobileOS=ETC&MobileApp=WebTest&serviceKey=${process.env.REACT_APP_API_KEY}&_type=JSON`;
        try {
            const response = await axios.get(API_URL);
            setCampData(response?.data?.response?.body?.items?.item);
            setTotalData(response?.data?.response?.body?.totalCount);
        } catch (err) {
            return (
                <p>{err.message} : 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.</p>
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!userID) {
            alert("로그인 후 이용 가능합니다.");
            navigate("/");
        }
    }, [userID, navigate]);

    if (!userID) {
        return null;
    }

    const onGoPage = (index) => {
        pageNo.current = currentPageGroup * pageButtonNumber + index + 1;
        fetchData();
    };
    const onPrevPage = () => {
        if (currentPageGroup > 0) {
            setCurrentPageGroup((prev) => prev - 1);
            pageNo.current = (currentPageGroup - 1) * pageButtonNumber + 1;
            fetchData();
        }
    };
    const onPrev = () => {
        if (pageNo.current > 1) {
            pageNo.current -= 1;
            fetchData();
            if (pageNo.current <= currentPageGroup * pageButtonNumber) {
                setCurrentPageGroup((prev) => prev - 1);
            }
        }
    };
    const onNext = () => {
        if (pageNo.current < totalPage) {
            pageNo.current += 1;
            fetchData();
            if (pageNo.current > (currentPageGroup + 1) * pageButtonNumber) {
                setCurrentPageGroup((prev) => prev + 1);
            }
        }
    };
    const onNextPage = () => {
        if (currentPageGroup < totalPage - 1) {
            setCurrentPageGroup((prev) => prev + 1);
            pageNo.current = (currentPageGroup + 1) * pageButtonNumber + 1;
            fetchData();
        }
    };

    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        alert("로그아웃되었습니다.");
        navigate("/");
    };

    return (
        <>
            <h1>환영합니다 {userID}님!</h1>
            <button onClick={onLogout}>로그아웃</button>
            <Link to="/mypage">마이페이지</Link>

            {loading ? (
                <p>데이터를 불러오는 중입니다.</p>
            ) : (
                <>
                    <CampListBlock campData={campData} />
                    <button onClick={onPrevPage}>이전 페이지</button>
                    <button onClick={onPrev}>이전</button>
                    {Array.from(
                        {
                            length: Math.min(
                                pageButtonNumber,
                                totalPage - currentPageGroup * pageButtonNumber
                            ),
                        },
                        (_, index) => {
                            const pageIndex = currentPageGroup * pageButtonNumber + index + 1;
                            return (
                                <Button
                                    key={index}
                                    onClick={() => onGoPage(index)}
                                    $active={pageIndex === pageNo.current}
                                >
                                    {pageIndex}
                                </Button>
                            );
                        }
                    )}
                    <button onClick={onNext}>다음</button>
                    <button onClick={onNextPage}>다음 페이지</button>
                </>
            )}
        </>
    );
}

export default MainBlock;
