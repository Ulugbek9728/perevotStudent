import React, {useEffect, useState, useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import Footer from "../component/footer";
import {PrintInfo} from "../component/printInfo"

import Nav from "../component/nav";

function Natija(props) {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const componentRef = useRef();
    const handlePrint = useReactToPrint({content: () => componentRef.current,});
    return (
        <div className="natija">
            <Nav/>

            <PrintInfo ref={componentRef} />
            <button className='btn btn-primary down' onClick={handlePrint}>Ma'lumotlarni yuklash</button>

            <Footer/>
        </div>
    );
}

export default Natija;