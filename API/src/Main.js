import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import CampListBlock from "./CampListBlock";

function MainBlock() {
    const [pageNo, setPageNo] = useState(1); //현재 페이지 수
    const [campgroundInfo, setCampGroundInfo] = useState();

    const [totalData, setTotalData] = useState(0);
    const [pageRange, setPageRange] = useState(5);
    const [buttonRange, setButtonRange] = useState(7);

    const [current, setCurrent] = useState(Math.ceil(pageNo / buttonRange));
    const [startPage, setStartPage] = useState((current - 1) * buttonRange + 1);

    const API_URL = `https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=10&pageNo=${pageNo}&MobileOS=ETC&MobileApp=WebTest&serviceKey=${process.env.REACT_APP_API_KEY}&_type=JSON`;
    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setCampGroundInfo(response?.data?.response?.body?.items?.item);
            setTotalData(response?.data?.response?.body?.totalCount);
            console.log("response", response);
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log("Loading..");
        }
    };

    useEffect(() => {
        fetchData();
        setPageNo(1);
        setPageRange(5);
        setButtonRange(5);
        setStartPage((current - 1) * buttonRange + 1);
    }, []);
    useLayoutEffect(() => {
        fetchData();
    }, [pageNo]);
    useEffect(() => {
        setStartPage((current - 1) * buttonRange + 1);
    }, [current, buttonRange, startPage]);
    return (
        <>
            <CampListBlock campgroundInfo={campgroundInfo} />
            {buttonRange && startPage
                ? Array(buttonRange)
                      .fill(startPage)
                      .map((_, index) => (
                          <button key={index} onClick={() => setPageNo(startPage + index)}>
                              {startPage + index}
                          </button>
                      ))
                : null}
        </>
    );
}

export default MainBlock;

/*
API를 사용하여 데이터 출력하기
get의 특징
url에 사용자가 원하는 정보를 요청해서 받아 올 수 있다.
numOfRows=10 : 한 페이지 결과 수
pageNo : 페이지 번호
MobileOS : OS 구분
MobileApp : 서비스명
serviceKey : 인증키
*/
/*    const nextGo = () => {
        setPageNo((prev) => prev + 1);
    };
    const prevGo = () => {
        if (pageNo <= 0) {
            return;
        }
        setPageNo((prev) => prev - 1);
    };

    const goToPage = (page) => {
        setPageNo(page);
    };
<button onClick={nextGo}>+</button>
            <button onClick={prevGo}>-</button>

            <div>
                {campgroundInfo.map((_, index) => (
                    <button key={index} onClick={() => goToPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
*/
