import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataState, selectDataState } from "../Data";
function Home() {
    const dataList = useRecoilValue(dataState);
    const [_, setSelectData] = useRecoilState(selectDataState);
    //const setSelectData = useRecoilValue(selectDataState)는 왜 에러일까
    const navigate = useNavigate();
    const goDeletePage = (data) => {
        setSelectData(data);
        navigate("/Delete");
    };
    return (
        <>
            <div>
                <h1>홈</h1>
                <div>
                    <Link to="/Create">생성</Link>
                </div>
                <hr />
                {dataList.map((dataItem) => (
                    <div key={dataItem.id}>
                        <li>{dataItem.id}</li>
                        <li>{dataItem.customvalue}</li>
                        <li>{dataItem.nickname}</li>
                        <li>{dataItem.unit}</li>
                        <li>
                            <button onClick={() => goDeletePage(dataItem)}>수정/삭제</button>
                            {/* <Link to="/Delete">삭제/수정</Link> */}
                        </li>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    );
}
export default Home;
