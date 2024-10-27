import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import CampListBlock from "./CampListBlock";

function MainBlock() {
    const [campgroundInfo, setCampGroundInfo] = useState();
    const API_URL = `https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=WebTest&serviceKey=${process.env.REACT_APP_API_KEY}&_type=JSON`;

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setCampGroundInfo(response.data.response.body.items.item);
            console.log("response", response);
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log("Loading..");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <CampListBlock campgroundInfo={campgroundInfo} />
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
