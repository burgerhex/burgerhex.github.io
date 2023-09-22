import './App.css';
import {Routes, Route, HashRouter} from "react-router-dom";
import {Hexdle} from "./hexdle/Hexdle";
import {NoPage} from "./NoPage";
import {Home} from "./Home";

function App() {
    return (
        <HashRouter basename="/">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="hexdle" element={<Hexdle/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
