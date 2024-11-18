import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Create from "./components/Create";
import EditUser from "./components/EditUser";
import Home from "./components/Home";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">홈</Link>
                        </li>
                        <li>
                            <Link to="/create">생성</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit/:id" element={<EditUser />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
