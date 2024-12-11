import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CampInfoBlock from "./CampInfoBlock";
import FindID from "./FindID";
import FindPW from "./FindPW";
import Login from "./Login";
import MainBlock from "./Main";
import MyPage from "./MyPage";
import Signin from "./Signin";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<MainBlock />} /> */}
                    <Route path="/" element={<Login />} />
                    <Route path="/main" element={<MainBlock />} />
                    <Route path="/campinfo/:contentId" element={<CampInfoBlock />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/findid" element={<FindID />} />
                    <Route path="/findpw" element={<FindPW />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
/*
API를 사용하여 데이터 출력하기
get의 특징
url에 사용자가 원하는 정보를 요청해서 받아 올 수 있다.
page=1,perPage=10는 1페이지 10개를 불러오겠다는 의미이다.

*/
