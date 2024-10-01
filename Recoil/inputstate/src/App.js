import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Create from "./component/Create";
import Delete from "./component/Delete";
import Home from "./component/Home";

function App() {
    return (
        <>
            <RecoilRoot>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Create" element={<Create />} />
                        <Route path="/Delete" element={<Delete />} />
                        {/* 
                    <Route path="/Delete" element={<DeleteBlock />} /> */}
                    </Routes>
                </Router>
            </RecoilRoot>
            {/*
            <Card />
             <Test />
            <Test1 />
            <Test2 /> */}
        </>
    );
}

export default App;
