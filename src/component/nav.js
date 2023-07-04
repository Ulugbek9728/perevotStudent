import React from 'react';
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import {Link} from "react-router-dom";


function Nav(props) {
    const {t, i18n } = useTranslation();
    return (
        <div className='navbar'>
            <Link to='/'>
                <img className="logoNavbar" src="./logo.png" alt=""/>
            </Link>
            {t("header.Title")}
            <LanguageDropdown/>
        </div>
    );
}

export default Nav;