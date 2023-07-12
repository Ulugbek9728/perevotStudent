import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import user from "../img/user.png";
import pasword from "../img/padlock.png";
import {ApiName} from "../APIname";
import {ApiName1} from "../APIname1";
import axios from "axios";
import "../asset/login.scss"
import {useNavigate} from "react-router";

import {toast} from "react-toastify";
import {Button, Form, Input} from 'antd';
import Nav from "../component/nav";
import Footer from "../component/footer";

function
Login(props) {
    const formRef = React.useRef(null);

    const {t} = useTranslation();

    const [passwordBoolin, setPasswordBoolin] = useState(true);
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');
    const navigate = useNavigate();
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    function Login(values) {
        const requestData = {
            login: values?.ism,
            password: values?.Parol
        };
        setIsButtonLoading(true);
        axios.post(`${ApiName1}/api/login`, requestData).then((response) => {
            console.log(response);
            if (response.status === 200) {
                if (response.data.role === "ROLE_ADMIN") {
                    localStorage.setItem("token", response.data.jwt);
                    localStorage.setItem("user_Info", response.data.name);
                    navigate("/Adminyoli");
                }
                if (response.data.role==="ROLE_STUDENT"){
                    localStorage.setItem("token", response.data.jwt);
                    localStorage.setItem("user_Info", response.data.name);
                    navigate("/Result");
                }
            }
            setIsButtonLoading(false);
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 403) {
                setMessage2(error.response.data);
                setIsButtonLoading(false);
            } else {
                axios.post(`${ApiName}auth/login`, requestData).then((response) => {
                    localStorage.setItem("token", response.data.data.token);
                    navigate("/Submit");
                    setIsButtonLoading(false);
                }).catch((error) => {
                    setIsButtonLoading(false);
                    setMessage2('Login yoki parol xato');
                })
            }
        })
    }

    useEffect(() => {
        localStorage.removeItem("token");
        notify();
        setMessage2('')
    }, [message2]);


    function notify() {
        if (message !== '') {
            message && message.map((item) => (toast.error(item)))
        }
        if (message2 !== '') {
            toast.error(message2)
        }
    }

    return (
        <>
            <Nav/>
            <div className="container loginPage">
                <div className="row">
                    <div className="login-page">
                        <div className="left-side">
                            <div className="title">
                                {t("salom")}
                            </div>
                            <p className="commit">
                                {t("TTJxushKelibsiz")}
                            </p>
                            <p className="commit">
                                {t("TTJeslatma")}
                            </p>
                            <p className="commit">
                                <ul>
                                    <li>{t("eslatma1")}</li>
                                    <li>{t("eslatma2")}</li>
                                    <li>{t("eslatma3")}</li>
                                </ul>
                            </p>
                        </div>
                        <div className="right-side">
                            <div className="container">
                                <div className="create">
                                    {t("header.profilButton")}
                                </div>
                                <div className="text">
                                    {t('enter-hemis-id')}
                                </div>
                                <Form
                                    layout={{
                                        labelCol: {
                                            span: 8,
                                        },
                                        wrapperCol: {
                                            span: 16,
                                        },
                                    }}
                                    ref={formRef}
                                    autoComplete="off"
                                    onFinish={Login}
                                >
                                    <Form.Item
                                        name="ism"
                                        rules={[
                                            {
                                                required: true,
                                                message: t("required.name"),
                                                min: 1
                                            }
                                        ]}
                                    >
                                        <div className="all-input">
                                            <Input
                                                type="text"
                                                placeholder={t('student-id')}
                                                name="ism"
                                            >

                                            </Input>
                                            <img src={user} alt="user-icon" className='user-icon'/>
                                        </div>
                                    </Form.Item>
                                    <Form.Item
                                        name="Parol"
                                        rules={[
                                            {
                                                required: true,
                                                message: t('required.password'),
                                                min: 1
                                            }
                                        ]}
                                    >
                                        <div className="all-input">
                                            <Input type={passwordBoolin ? "password" : "text"}
                                                   placeholder={t('password')}
                                                   name="Parol"
                                            />
                                            <img src={pasword} alt="user-icon" className='user-icon'/>
                                            {passwordBoolin ?
                                                <img onClick={() => setPasswordBoolin(!passwordBoolin)}
                                                     src="/img/show(1).png" alt=""
                                                     className="show"/>
                                                :
                                                <img onClick={() => setPasswordBoolin(!passwordBoolin)}
                                                     src="/img/show.png" alt=""
                                                     className="show"/>
                                            }
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={isButtonLoading}
                                            className="signUp"
                                        >{t('enter')}</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    );
}

export default Login;