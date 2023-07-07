import React, {useEffect, useState} from 'react';
import Footer from "../component/footer";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {ApiName1} from "../APIname1";
import Nav from "../component/nav";

function Natija(props) {
    const {t} = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const lang = localStorage.getItem('i18nextLng');


    return (
        <>
            <Nav/>
            <div className="container loginPage">
                <div className="row">
                    <div className="login-page">
                        <div className="left-side">
                            <div className="title">
                                {t('result')}
                            </div>
                            <div className="">

                            </div>
                        </div>

                        <div className="right-side">
                            <div className="container">

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    );
}

export default Natija;