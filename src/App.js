import React from 'react';
import HOME from './pages/Home'
import {Routes, Route} from "react-router-dom";
import "./asset/navbar.scss"
// import Ariza from "./pages/ariza";
// import Login from "./pages/login";
// import Natija from "./pages/natija";
import {ToastContainer} from "react-toastify";


function App() {

    return (
        <div className="App">
            <ToastContainer/>
            <Routes>
                {/*<Route path={"/login"} element={<Login/>}/>*/}
                {/*<Route path={"/Submit"} element={<Ariza/>}/>*/}
                {/*<Route path={"/Result"} element={<Natija/>}/>*/}
                {/*<Route path={"/Adminyoli/*"} element={<AdminPage/>}/>*/}
                <Route path={"/"} element={<HOME/>}/>
            </Routes>
        </div>
    );
}

export default App;
