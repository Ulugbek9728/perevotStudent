import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import user from "../img/user.png";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {Button, Form, Input} from "antd";
import {toast} from "react-toastify";

function Natija(props) {
    const {t} = useTranslation();
    const [status, setStatus] = useState('');
    const [login, setLogin] = useState('');
    const [Student, setStudent] = useState({});
    const [text, setText] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const lang = localStorage.getItem('i18nextLng');

    useEffect(() => {
        switch (Student?.status) {
            case 'ACCEPTED': {
                if (Student.dormitoryStudentStatus==='JOINED'){
                    setText(t('success-ttj'));
                    setFileUrl(Student?.response_file_url);
                }
                else {
                    setText(t('application-removed'));
                    setFileUrl(Student?.removeFileUrl);
                }
                break;
            }
            case 'IS_ACCEPTED': {
                setText(t('application-pending'));
                break;
            }
            case 'NOT_ACCEPTED': {
                setText(Student?.message);
                break;
            }
        }
    }, [status, lang])

    function Login(values) {
        setIsLoading(true);
        setLogin(values.ism);
        axios.post(`${ApiName1}/public/student/login`, {login: values.ism})
            .then((response) => {
                setStudent(response.data);
                setStatus(response.data.status);
                setIsLoading(false);
                console.log(response.data)
            }).catch((error) => {
            toast.error(error.response?.data === 'Bunday talaba mavjud emas!' ? t('student-not-found') : '');
            setIsLoading(false);
        })
    }

    return (
        <>
            <Navbar/>
            <div className="container loginPage">
                <div className="row">
                    <div className="login-page">
                        <div className="left-side">
                            <div className="title">
                                {t('result')}
                            </div>
                            <div className="">
                                <span className='commit'>
                                    {text}
                                </span>
                                <br/>
                                {fileUrl && (status === 'ACCEPTED' || status === 'REMOVED') && <a href={`${ApiName1}${fileUrl}`} target='_blank'>
                                    file
                                </a>}
                            </div>
                        </div>

                        <div className="right-side">
                            <div className="container">
                                <div className="create">
                                    {t('know-result')}
                                </div>
                                <div className="text">
                                    {t('enter-hemis-id')}
                                </div>

                                <Form
                                    fields={[
                                        {
                                            name: ['ism'],
                                            value: login
                                        }]}
                                    onFinish={Login}
                                >
                                    <Form.Item
                                        name="ism"
                                        rules={
                                            [{required: true,
                                                    message: t('required.name')
                                                }]}

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
                                    <Form.Item>
                                        <Button
                                            loading={isLoading}
                                            htmlType="submit"
                                            className="signUp"
                                        >
                                            {t('send')}
                                        </Button>
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

export default Natija;