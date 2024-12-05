import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CampListBlock from "./CampListBlock";
const Button = styled.button`
    font-weight: ${(props) => (props.$active ? "bold" : "normal")};
    color: ${(props) => (props.$active ? "red" : "black")};
`;
function MainBlock() {
    const userID = localStorage.getItem("userID");

    const [campData, setCampData] = useState(); //api에서 불러온 데이터
    const [totalData, setTotalData] = useState(0); //api 총 데이터 양
    const numOfRows = 10;
    const pageNo = useRef(1);
    const pageButtonNumber = 5; // 페이지네이션 숫자 버튼 개수
    const [currentPageGroup, setCurrentPageGroup] = useState(0); // 현재 페이지 그룹

    const totalPage = Math.ceil(totalData / numOfRows); // 최대 페이지 계산

    const fetchData = async () => {
        const API_URL = `https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=${numOfRows}&pageNo=${pageNo.current}&MobileOS=ETC&MobileApp=WebTest&serviceKey=${process.env.REACT_APP_API_KEY}&_type=JSON`; //api url
        try {
            const response = await axios.get(API_URL);
            setCampData(response?.data?.response?.body?.items?.item);
            setTotalData(response?.data?.response?.body?.totalCount);
        } catch (err) {
            return (
                <p>{err.message} : 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.</p>
            );
        } finally {
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

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
    return (
        <>
            <h1>환영합니다 {userID}님!</h1>
            <p>
                <Link to="/login">로그인</Link>
            </p>
            <p>
                <Link to="/signin">회원가입</Link>
            </p>
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
    );
}

export default MainBlock;
