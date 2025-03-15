import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Container from "./components/layout/Container";

import Home from './components/pages/Home';
import RegisterMovie  from "./components/pages/RegisterMovie";

import Navbar from './components/layout/NavBar';
import Sidebar from "./components/layout/Sidebar";
import ListMovie from "./components/pages/ListMovie";

function App() {
    return (
        <BrowserRouter>
            <Navbar /> 
            <Sidebar/>
            <Container>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/RegisterMovie' element={<RegisterMovie />} />
                    <Route path='/ListMovie' element={<ListMovie />} />

                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
