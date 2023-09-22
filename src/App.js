import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Hexdle} from "./hexdle/Hexdle";
import {NoPage} from "./NoPage";
import {Home} from "./Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="hexdle" element={<Hexdle/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
