import React from 'react';
import "./asset/navbar.scss"
import {Routes, Route} from "react-router-dom";
import "./asset/navbar.scss"
import Ariza from "./pages/ariza";
import Login from "./pages/login";
import {ToastContainer} from "react-toastify";
import AdminPage from "./pages/adminPage";
import Natija from "./pages/natija";



function App() {

    return (
        <div className="App">
            <ToastContainer/>
            <div className="box">
                <Routes>
                    <Route path={"/Submit"} element={<Ariza/>}/>
                    <Route path={"/Result"} element={<Natija/>}/>
                    <Route path={"/Adminyoli/*"} element={<AdminPage/>}/>
                    <Route path={"/"} element={<Login/>}/>
                </Routes>


            </div>

        </div>
    );
}

export default App;
