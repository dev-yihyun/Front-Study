import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarBlock from "./component/AppBar";
import HomeBlock from './component/Home';
import CreateEditBlock from './component/CreateEdit';
import DeleteBlock from './component/Delete';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
    <RecoilRoot>
      
      <div /*  className="Root" */>
    
        <Router>
          <div>
            <AppBarBlock/>
            <Routes>
              <Route path="/" element={<HomeBlock/>}/>
              <Route path="/CreateEdit" element={<CreateEditBlock/>}/>
              <Route path="/Delete" element={<DeleteBlock/>}/>
            </Routes>
          </div>
        </Router>
      </div>
      </RecoilRoot>
    </>
  );
}

export default App;
