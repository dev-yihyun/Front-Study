import React from "react";
import { Link } from "react-router-dom";

function AppBarBlock(){
    return(
        <div /* className="AppBar" */>
            <Link to="/">홈</Link>
            <Link to="/CreateEdit">생성/수정</Link>
            <Link to="/Delete">삭제</Link>
        </div>
    )
}

export default AppBarBlock;