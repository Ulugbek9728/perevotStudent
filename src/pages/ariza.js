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
import ariza from "./Ариза переводга намуна.pdf"


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
        applicationType: 'CHANGE_SPECIALITY',
        attachList: [],
        changeLanguage:''
    });
    const [file, setFile] = useState([{
        fileName: '',
        fileBox: null
    }]);
    const [isLoading, setIsLoading] = useState(false);
    const [fileBoolin, setFileBoolin] = useState(false);
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
        axios.get(`${ApiName1}/api/student/account/me`, {
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
            });
            axios.get(`${ApiName1}/api/specialty/public/alternative/${response.data.data.specialty.name}`, '').then(
                (res) => {
                    console.log(res)
                }).catch((error) => {
                console.log(error)
            })
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

    const handleChangeLen = (value) => {
        setStudent({...Student, changeLanguage: value});
    };
    const showForm = () => {
        switch (Student?.applicationType) {
            case "CHANGE_LANG": {
                return (
                    <Form name="dynamic_form_nest_item" onFinish={onFinish}
                          autoComplete="off">
                        <p>{t('faculty')}: <span>{Student.faculty}</span></p>
                        <p>{t('direction')}: <span>{Student.specialty}</span></p>
                        <p>{t('Transklip')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>{t('til')}:</p>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            onChange={handleChangeLen}
                            allowClear
                            options={[
                                {
                                    value: 'Uz',
                                    label: 'uz',
                                },
                                {
                                    value: 'Ru',
                                    label: 'ru',
                                },]}/>
                        <p>{t('pasport')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>Ariza:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                    </Form>
                )
            }
            case "CHANGE_SPECIALITY": {
                return (
                    <Form name="dynamic_form_nest_item" onFinish={onFinish}
                          autoComplete="off">
                        <p>{t('direction')}:</p>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            onChange={handleChangeLen}
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
                        <p>{t('talim-shakli')}:</p>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            onChange={handleChangeLen}
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
                            onChange={handleChangeLen}
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
                        <p>{t('Transklip')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>{t('sabab')}:
                            <input className='mx-2' onChange={(e) => {
                                setFileBoolin(e.target.checked)
                            }}
                                   type="checkbox"/>
                            file
                        </p>
                        {
                            fileBoolin ?
                                <input className='form-control' type="file" accept="application/pdf"/>
                                :
                                <input className='form-control' type="text"/>
                        }
                        <p>{t('pasport')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>


                        <p>{t('ariza')}:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                    </Form>
                )
            }
            case "RECOVER": {
                return (
                    <Form name="dynamic_form_nest_item" onFinish={onFinish}
                          autoComplete="off">
                        <p>{t('direction')}:</p>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            onChange={handleChangeLen}
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
                        <p>{t('talim-shakli')}:</p>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            onChange={handleChangeLen}
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
                            onChange={handleChangeLen}
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
                        <p>{t('Transklip')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>{t('sabab')}:
                            <input className='mx-2' onChange={(e) => {
                                setFileBoolin(e.target.checked)}} type="checkbox"/>file
                        </p>
                        {
                            fileBoolin ?
                                <input className='form-control' type="file" accept="application/pdf"/>
                                :
                                <input className='form-control' type="text"/>
                        }
                        <p>{t('pasport')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>

                        <p>{t('ariza')}:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                    </Form>
                )
            }
        }
    }
    const showInfo = () => {
        switch (Student?.applicationType) {
            case "CHANGE_LANG": {
                return (
                    <div>
                        <p>1) {t('Transklip')}<span>{t('TransklipText')}</span></p>
                        <p>2) {t('til')}<span>{t('tilText')}</span></p>
                        <p>3) {t('sabab')}<span>{t('sababText')}</span></p>
                        <p>4) {t('pasport')}<span>{t('pasportText')}</span></p>
                        <p>5) {t('ariza')}
                            <a href={ariza} target={"_blank"}> {t('namuna')}</a>
                            <span>{t('arizaText')}</span>
                        </p>
                    </div>
                )
            }
            case "CHANGE_SPECIALITY": {
                return (
                    <div>
                        <p>1) {t('direction')}<span>{t('directionText')}</span></p>
                        <p>2) {t('talim-shakli')}<span>{t('talim-shakliText')}</span></p>
                        <p>3) {t('til')}<span>{t('tilText')}</span></p>
                        <p>4) {t('Transklip')}<span>{t('TransklipText')}</span></p>
                        <p>5) {t('sabab')}<span>{t('sababText')}</span></p>
                        <p>6) {t('pasport')}<span>{t('pasportText')}</span></p>

                        <p>7) {t('ariza')}
                            <a href={ariza} target={"_blank"}> {t('namuna')}</a>
                            <span>{t('arizaText')}</span>
                        </p>
                    </div>
                )
            }
            case "RECOVER": {
                return (
                    <div>
                        <p>1) {t('direction')}<span>{t('directionText')}</span></p>
                        <p>2) {t('talim-shakli')}<span>{t('talim-shakliText')}</span></p>
                        <p>3) {t('til')}<span>{t('tilText')}</span></p>
                        <p>4) {t('Transklip')}<span>{t('TransklipText')}</span></p>
                        <p>5) {t('sabab')}<span>{t('sababText1')}</span></p>
                        <p>6) {t('pasport')}<span>{t('pasportText')}</span></p>

                        <p>7) {t('ariza')}
                            <a href={ariza} target={"_blank"}> {t('namuna')}</a>
                            <span>{t('arizaText')}</span>
                        </p>
                    </div>
                )
            }
        }
    };
    return (
        <>
            <Nav/>
            <div className='container-fluid ArizaPage'>
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
                            <p>{t('phone')}:
                                <br/>
                                <input onChange={(e)=>{setStudent({
                                    ...Student, phone:e.target.value})}}
                                       className='form-control' type="number"/>
                            </p>

                        </div>

                        <div className="center">
                            <h5>{t('give-reason-for-ttj')}</h5>
                            <Segmented onChange={(e) => {
                                setStudent({...Student, applicationType: e})
                            }} block options={[

                                {
                                    label: `${t('directionChang')}`,
                                    value: "CHANGE_SPECIALITY"
                                },
                                {
                                    label: `${t('recover')}`,
                                    value: "RECOVER"
                                },
                                {
                                    label: `${t('til')}`,
                                    value: "CHANGE_LANG"
                                },
                            ]}/>
                            <h5 className="mt-4">TALABALAR UCHUN YO‘RIQNOMA</h5>
                            {showInfo()}
                        </div>

                        <div className="right-side overflow-auto">


                            <div className="container p-0">
                                {showForm()}

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