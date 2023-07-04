import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import Navbar from "../components/Navbar";

import Footer from "../components/footer";
import axios from "axios";
import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Space} from 'antd';
import {ApiName1} from "../APIname1";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";

import {CaretDownOutlined} from '@ant-design/icons';

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
        attachList: []
    });
    const [file, setFile] = useState([{
        fileName: '',
        fileBox: null
    }]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');
    const [sucsessText, setSucsessText] = useState('');
    const [sabab, setSabab] = useState([{}]);
    const [Index, setIndex] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const lang = localStorage.getItem('i18nextLng');
    const addLanguage = () => {
        setFile([...file, {
            fileName: '',
            fileBox: ''
        }])
    };
    useEffect(() => {
        setSabab([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            .map((item) => (
                {
                    name: t(`reasons.${item}`)
                }))
        )
    }, [lang]);
    const handleInputFile = (e, index) => {
        file[index].fileBox = e.target.files[0]
    };

    const handleInputLanguage = (e, index) => {
        setFile(file?.map((item, idn) => {
            if (idn === Index) {
                item.fileName = e;
                return item;
            } else {
                return item;
            }
        }));
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);

    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
            })
        }).catch((error) => {
            navigate("/login");
            console.log(error);
        })

    }

    function postStudent() {
        const allData = new FormData();
        setIsLoading(true);
        file.map((item, index) => (<>{allData.append(item.fileName, item.fileBox)}</>));

        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {
                Student.attachList = response.data

                axios.post(`${ApiName1}/public/student/join/data`, Student)
                    .then((response) => {
                        if (response.status === 201) {
                            setFile([{
                                fileName: '',
                                fileBox: null
                            }])

                            document.getElementById('FILE').value = null;
                            setSucsessText(t('data-send-success'))
                            setIsLoading(false);
                        }
                    }).catch((error) => {
                    setIsLoading(false);
                    if (error.response.status === 400) {
                        setMessage2(error.response.data==='Bunday talaba mavjud '?t('application-submitted-already'):'')
                    }
                })

            }).catch((error) => {
            setIsLoading(false);
        })
    }

    return (
        <>
            <Navbar/>


            <div className='container ArizaPage'>
                <Modal title={"Sababni Tanlang"} open={isModalVisible}
                       onOk={handleOk} onCancel={handleCancel}>
                    <div>
                        {sabab.map((item,index) => {
                            return <div key={item.name} className="test"
                                        onClick={(e) => {
                                            handleInputLanguage(item.name)
                                            setIsModalVisible(false)
                                        }}>
                                {item.name}
                                <hr/>
                            </div>
                        })}

                    </div>
                </Modal>
                <div className="row">
                    <div className="title">
                        {t("carusel.Ariza yuborish")}
                    </div>
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
                            <p>{t('group')}: <span>{Student.group}</span></p>
                            <p>{t('course')}: <span>{Student.course}</span></p>
                            <p>{t('address')}:
                                <span>{Student.country} {Student.city} {Student.district}</span>
                            </p>
                            <p>{t('phone')}: <span>{Student.phone}</span></p>

                        </div>

                        <div className="right-side overflow-auto">
                            <h5>{t('give-reason-for-ttj')}</h5>
                            <span>{t('only-pdf')}</span>
                            <div className="container p-0">
                                <Form name="dynamic_form_nest_item" onFinish={onFinish}
                                      autoComplete="off">
                                    {file && file.map((item, index) => (
                                        <div key={index} style={{display: 'flex', marginBottom: 8}}
                                             align="baseline">
                                            <button className='selectBtn btn' type="button"
                                                    onClick={()=>{
                                                        showModal();
                                                        setIndex(index)
                                                    }}>
                                                {item.fileName}
                                                <CaretDownOutlined />
                                            </button>
                                            <input type="file" className='form-control' id='FILE'
                                                   accept="application/pdf"
                                                   onChange={(e) => handleInputFile(e, index)}/>
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" block icon={<PlusOutlined/>}
                                                onClick={addLanguage}
                                        >
                                            Add field
                                        </Button>
                                    </Form.Item>


                                </Form>

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