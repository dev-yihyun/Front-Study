import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CampListBlock from "./CampListBlock";
const Button = styled.button`
    font-weight: ${(props) => (props.$active ? "bold" : "normal")};
    color: ${(props) => (props.$active ? "red" : "black")};
`;
function MainBlock() {
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
            console.log("response", response);
        } catch (err) {
            console.log(err.message);
            return (
                <p>{err.message} : 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.</p>
            );
        } finally {
            console.log("Loading..");
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

/*
[로직 설명]
currentPageGroup 상태 추가
: 현재 페이지 그룹을 관리하기 위해 currentPageGroup이라는 상태를 추가
onPrevPage : currentPageGroup을 줄이고 해당 그룹의 첫 번째 페이지로 이동
onNextPage : currentPageGroup을 하나 늘리고 해당 그룹의 첫 번째 페이지로 이동
페이지 버튼 표시 : 현재 currentPageGroup에 맞춰 페이지 번호를 보여준다.

Array.from : 새로운 배열을 생성하는 메서드
Array.from({ length: ... }) : 배열의 길이를 계산해서 해당 버튼을 생성
Math.min(pageButtonNumber, maxPage - currentPageGroup * pageButtonNumber)
: 배열의 길이를 설정하는 부분
pageButtonNumber : 한 번에 쵸시할 페이지 버튼의 개수
maxPage - currentPageGroup * pageButtonNumber
: 현재 페이지 그룹에서 표시할 수 있는 남은 페이지 버튼 수를 계산
현재 페이지 그룹이 0 이면 첫 번쨰 그룹으로 1~5까지 표시
다음 페이지 그룹은 6~10까지된다.
남은 페이지 수가 최대 버튼수를넘지 않도록 하기 위해 Math.min을 사용한다.

(_, index):Array.from에서 배열을 순회하면서 각 항목에 대해 호출되는 함수
첫 번째 인자는 무시하고, 두 번째 인자인 index는 key 값을 생성하는 데 사용

const pageIndex = currentPageGroup * pageButtonNumber + index + 1;
currentPageGroup : 현제 페이지 그룹
페이지 버튼 그룹이 여러개로 나뉘어 있을때 그 그룹 번호를 나타낸다.
index : 현재 그룹 내에서 각 페이지 버튼의 위치를 나타낸다.
첫 번째 그룹에서 index는 0부터 시작한다.
pageIndex : 실제 페이지 번호를 계산
currentPageGroup과 index 를 조합하여 pageIndex를 생성한다.

*/
