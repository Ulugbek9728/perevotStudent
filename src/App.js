import React from 'react';
import "./asset/navbar.scss"
import {Routes, Route} from "react-router-dom";
import "./asset/navbar.scss"
import Ariza from "./pages/ariza";
import Login from "./pages/login";
// import Natija from "./pages/natija";
import {ToastContainer} from "react-toastify";
import Nav from "./component/nav";
import Footer from "./component/footer";



function App() {

    return (
        <div className="App">
            <ToastContainer/>
            <div className="box">
                <Nav/>
                <Routes>
                    <Route path={"/Submit"} element={<Ariza/>}/>
                    {/*<Route path={"/Result"} element={<Natija/>}/>*/}
                    {/*<Route path={"/Adminyoli/*"} element={<AdminPage/>}/>*/}
                    <Route path={"/"} element={<Login/>}/>
                </Routes>
                <Footer/>

            </div>

        </div>
    );
}

export default App;
