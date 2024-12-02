import { Link } from "react-router-dom";
import "./index.css";
function Login() {
    return (
        <>
            <p>
                <Link to="/">메인</Link>
            </p>
            <p>
                ID : <input type="text" />
            </p>
            <p>
                PW : <input type="password" />
            </p>
            <button>로그인</button>
        </>
    );
}

export default Login;
