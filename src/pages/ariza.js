import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import axios from "axios";
import {Button, Form, Segmented, Select, Space} from 'antd';
import {ApiName1} from "../APIname1";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import Nav from "../component/nav";
import Footer from "../component/footer";


const onFinish = (values: any) => {
    console.log('Received values of form:', values);
};

function Ariza(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [Student, setStudent] = useState({
        name: "",
        login: "",
        imageUrl: "",
        specialty: "",
        group: "",
        gender: "",
        faculty: "",
        course: "",
        country: "",
        city: "",
        district: "",
        phone: "",
        educationForm: '',
        educationLang: '',
        educationType: '',
        attachList: []
    });
    const [file, setFile] = useState([{
        fileName: '',
        fileBox: null
    }]);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState(true);

    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');
    const [sucsessText, setSucsessText] = useState('');


    useEffect(() => {

        getStudent();
        notify();
        setMessage('');
        setMessage2('');
        setSucsessText('')
    }, [message, sucsessText, message2]);

    function notify() {
        if (message !== '') {
            message && message.map((item) => (toast.error(item)))
        }
        if (sucsessText !== '') {
            toast.success(sucsessText)
        }
        if (message2 !== '') {
            toast.error(message2)
        }
    }

    function getStudent() {
        axios.get(`${ApiName1}/account/me`, {
            params: {token: localStorage.getItem("token")}
        }).then((response) => {
            setStudent({
                ...Student,
                name: response.data.data.full_name,
                login: response.data.data.student_id_number,
                imageUrl: response.data.data.image,
                specialty: response.data.data.specialty.name,
                group: response.data.data.group.name,
                phone: response.data.data.phone,
                gender: response.data.data.gender.name,
                faculty: response.data.data.faculty.name,
                course: response.data.data.level.name,
                country: response.data.data.country.name,
                city: response.data.data.province.name,
                district: response.data.data.district.name,
                educationForm: response.data.data.educationForm.name,
                educationLang: response.data.data.educationLang.name,
                educationType: response.data.data.educationType.name,
            })
            console.log(response.data.data)
        }).catch((error) => {
            navigate("/");
            console.log(error);
        })

    }

    function postStudent() {
        // const allData = new FormData();
        // setIsLoading(true);
        // file.map((item, index) => (<>{allData.append(item.fileName, item.fileBox)}</>));
        //
        // axios.post(`${ApiName1}/attach/upload`, allData)
        //     .then((response) => {
        //         Student.attachList = response.data
        //
        //         axios.post(`${ApiName1}/public/student/join/data`, Student)
        //             .then((response) => {
        //                 if (response.status === 201) {
        //                     setFile([{
        //                         fileName: '',
        //                         fileBox: null
        //                     }])
        //
        //                     document.getElementById('FILE').value = null;
        //                     setSucsessText(t('data-send-success'))
        //                     setIsLoading(false);
        //                 }
        //             }).catch((error) => {
        //             setIsLoading(false);
        //             if (error.response.status === 400) {
        //                 setMessage2(error.response.data === 'Bunday talaba mavjud ' ? t('application-submitted-already') : '')
        //             }
        //         })
        //
        //     }).catch((error) => {
        //     setIsLoading(false);
        // })
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    console.log(language);

    return (
        <>
            <Nav/>
            <div className='container ArizaPage'>
                <div className="row">
                    <div className="login-page">
                        <div className="left-side">
                            <div className="imgBox">
                                <img src={Student.imageUrl} alt=""/>
                                <p className="fullName">{Student.name}</p>
                            </div>

                            <br/>
                            <p>{t('login')}:<span>{Student.login}</span></p>
                            <p>{t('faculty')}: <span>{Student.faculty}</span></p>
                            <p>{t('direction')}: <span>{Student.specialty}</span></p>

                            <p>{t('talim-shakli')}: <span>{Student.educationForm}</span></p>
                            <p>{t('talim-tili')}: <span>{Student.educationLang}</span></p>

                            <p>{t('talim-turi')}: <span>{Student.educationType}</span></p>
                            <p>{t('course')}: <span>{Student.course}</span></p>

                            <p>{t('group')}: <span>{Student.group}</span></p>
                            <p>{t('address')}:
                                <span>{Student.country} {Student.city} {Student.district}</span>
                            </p>
                            <p>{t('phone')}: <span>{Student.phone}</span></p>

                        </div>

                        <div className="right-side overflow-auto">
                            <h5>{t('give-reason-for-ttj')}</h5>
                            <Segmented onChange={(e) => {
                                setLanguage(e)
                            }} block options={[
                                {
                                    label:`${t('til')}`,
                                    value:true
                                },
                                {
                                    label:`${t('direction')}`,
                                    value:false
                                },
                            ]}/>

                            <div className="container p-0">
                                {language ?
                                    <Form name="dynamic_form_nest_item" onFinish={onFinish}
                                          autoComplete="off">
                                        <p>{t('faculty')}: <span>{Student.faculty}</span></p>
                                        <p>{t('direction')}: <span>{Student.specialty}</span></p>

                                        <p>{t('til')}:</p>
                                        <Select
                                            style={{
                                                width: "100%",
                                            }}
                                            onChange={handleChange}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'Uz',
                                                    label: 'uz',
                                                },
                                                {
                                                    value: 'Ru',
                                                    label: 'ru',
                                                },
                                            ]}
                                        />
                                    </Form>
                                    :
                                    <Form name="dynamic_form_nest_item" onFinish={onFinish}
                                          autoComplete="off">
                                        <p>{t('direction')}:</p>
                                        <Select
                                            style={{
                                                width: "100%",
                                            }}
                                            onChange={handleChange}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'uz',
                                                    label: 'Uz',
                                                },
                                                {
                                                    value: 'ru',
                                                    label: 'Ru',
                                                },
                                            ]}
                                        />
                                        <p>{t('til')}:</p>
                                        <Select
                                            style={{
                                                width: "100%",
                                            }}
                                            onChange={handleChange}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'uz',
                                                    label: 'Uz',
                                                },
                                                {
                                                    value: 'ru',
                                                    label: 'Ru',
                                                },
                                            ]}
                                        />
                                        <p>Sabab:</p>
                                        <input className='form-control' type="file" accept="application/pdf"/>
                                        <p>Ariza:</p>
                                        <input className='form-control' type="file" accept="application/pdf"/>
                                    </Form>
                                }

                            </div>
                            <div className="d-flex justify-content-center">
                                <Button loading={isLoading} className="signUp"
                                        onClick={postStudent}>
                                    {t('send')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    );
}

export default Ariza;