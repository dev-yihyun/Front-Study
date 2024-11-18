import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataSetState } from "../recoilState";

function Home() {
    const userDataSet = useRecoilValue(userDataSetState);

    return (
        <div>
            <h1>사용자 목록</h1>
            <ul>
                {userDataSet.map((user) => (
                    <li key={user.id}>
                        <p>
                            <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user.phone}
                        </p>
                        <p>
                            <strong>Nickname:</strong> {user.nickname}
                        </p>
                        <p>
                            <strong>Value:</strong> {user.value}
                        </p>
                        <Link to={`/edit/${user.id}`}>
                            <button>수정</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
