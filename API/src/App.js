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
                    <Route path="/" element={<Login />} />
                    <Route path="/main" element={<MainBlock />} />
                    <Route path="/campinfo/:contentId" element={<CampInfoBlock />} />
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
