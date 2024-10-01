import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Edit from "./components/Edit";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </Router>
    );
}

export default App;
