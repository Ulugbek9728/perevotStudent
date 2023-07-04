import React from 'react';
import "../asset/navbar.scss"
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className='home'>
            <Link to="/login">O'qishni ko'chirish</Link>
            <Link to="#">O'qishni Tiklash</Link>
        </div>
    );
}

export default Home;