import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import {Button, Form, Input, Segmented, Select} from 'antd';
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import Nav from "../component/nav";
import Footer from "../component/footer";
import ariza from "./Ариза переводга намуна.pdf"
import {getAlternativePublicList, getStudentInfo} from "../utils/ApiHelper";


const onFinish = (values: any) => {
    console.log('Received values of form:', values);
};

function Ariza(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [Student, setStudent] =
        useState({
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
            oldEducationForm: '',
            newEducationForm: '',
            oldEducationLang: '',
            newEducationLang: '',
            oldEducationType: '',
            newEducationType: '',
            applicationType: 'CHANGE_SPECIALITY',
            attachList: [],
            changeLanguage: '',
            changeSpecialtyID: null,
            reasonFileId: null,
            reasonText: '',
            passportPhotoId: null,
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
    const [specialityList, setSpecialityList] = useState([]);
    const [specialityLang, setSpecialityLang] = useState([]);
    const [specialityForms, setSpecialityForms] = useState([]);

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
        getStudentInfo()
            .then((response) => {
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
                    oldEducationForm: response.data.data.educationForm.name,
                    oldEducationLang: response.data.data.educationLang.name,
                    oldEducationType: response.data.data.educationType.name,
                });
                getAlternativePublicList(response?.data?.data?.specialty?.name)
                    .then((res) => {
                        setSpecialityList(res.data)
                    })
                    .catch((error) => {
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

    useEffect(() => {
        const languages = specialityList
            ?.filter((item) => item.id === Student?.changeSpecialtyID)
            ?.map((item) => JSON.parse(item?.educationLanguages))[0] || [];
        const forms = specialityList
            ?.filter((item) => item.id === Student?.changeSpecialtyID)
            ?.map((item) => JSON.parse(item?.educationForms))[0] || [];

        setSpecialityForms(forms?.map((item) => {
            return {
                value: item,
                label: t(item)
            }
        }));

        setSpecialityLang(languages?.map((item) => {
            return {
                value: item,
                label: t(item)
            }
        }));
    }, [Student?.changeSpecialtyID, specialityList])

    const showForm = () => {
        // eslint-disable-next-line default-case
        switch (Student?.applicationType) {
            case "CHANGE_LANG": {
                return (
                    <Form name="dynamic_form_nest_item" onFinish={onFinish}
                          autoComplete="off">
                        <Form.Item>
                            <p>{t('phone')}:
                                <br/>
                                <input onChange={(e) => {
                                    setStudent({...Student, phone: e.target.value})
                                }}
                                       className='form-control' type="number"/>
                            </p>
                        </Form.Item>
                        <p>1) {t('Transklip')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>2) {t('til')}:</p>
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
                        <p>3) {t('sabab')}:
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

                        <p>4) {t('pasport')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>5) {t('ariza')}:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>

                        <Form.Item className='d-flex justify-content-center mt-3'>
                            <Button className='signUp' htmlType="submit">{t('send')}</Button>
                        </Form.Item>
                    </Form>
                )
            }
            case "CHANGE_SPECIALITY": {
                return (
                    <Form
                        name="dynamic_form_nest_item"
                        onFinish={onFinish}
                        autoComplete="off"
                        fields={[
                            {
                                name: 'phone',
                                value: Student?.phone
                            }
                        ]}
                    >

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Telefon raqam kiritilishi shart!',
                                    whitespace: true,
                                    max: 12,
                                    min: 12
                                }
                            ]}
                            name="phone"
                        >
                            <p>{t('phone')}:
                                <Input
                                    placeholder="Telefon raqam kiriting..."
                                    name="phone"
                                    onChange={(e) => {
                                        setStudent({
                                            ...Student, phone: e.target.value
                                        })
                                    }}
                                    className='form-control'
                                    type="number"
                                />
                            </p>
                        </Form.Item>

                        <p>1) {t('direction')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Yonalish tanlash kerak!'
                                }
                            ]}
                            name="changeSpecialtyID"
                        >

                            <Select
                                placeholder={t('direction')}
                                name="changeSpecialtyID"
                                style={{
                                    width: "100%",
                                }}
                                value={Student?.changeSpecialtyID}
                                onChange={(e) => {
                                    setStudent({...Student, changeSpecialtyID: e})
                                }}

                                allowClear
                                options={specialityList?.map((item) => {
                                    return {
                                        value: item?.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>

                        <p>2) {t('talim-shakli')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Talim shakli tanlanishi kerak!'
                                }
                            ]}
                            name="newEducationForm"

                        >
                            <Select
                                placeholder={t('talim-shakli')}
                                style={{
                                    width: "100%",
                                }}
                                onChange={(e) => {
                                    setStudent({...Student, newEducationForm: e})
                                }}
                                allowClear
                                options={specialityForms}
                            />
                        </Form.Item>

                        <p>3) {t('til')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Ta\'lim tilini tanlash shart!'
                                }
                            ]}
                            name="newEducationLang"
                        >
                            <Select
                                style={{
                                    width: "100%",
                                }}
                                placeholder={t('til')}
                                onChange={(e) => {
                                    setStudent({...Student, newEducationLang: e})
                                }}
                                allowClear
                                options={specialityLang}
                            />
                        </Form.Item>

                        <p>4) {t('Transklip')}</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Transklip / zachyotka file tanlanishi kerak!'
                                }
                            ]}
                            name="recordBookId"
                        >
                            <input
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: `Sabab ${fileBoolin ? 'tanlanishi' : 'kiritilishi'}kerak!`
                                }
                            ]}
                            name={fileBoolin ? "reasonFileId" : "reasonText"}
                        >
                            <p>5) {t('sabab')}:
                                <input
                                    className='mx-2'
                                    onChange={(e) => {
                                        setFileBoolin(e.target.checked)
                                    }}
                                    type="checkbox"
                                />
                                File
                            </p>
                            {
                                fileBoolin ?
                                    <input className='form-control' type="file" accept="application/pdf"/>
                                    :
                                    <input className='form-control' type="text"/>
                            }
                        </Form.Item>
                        <p>6) {t('pasport')}</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Passport rasmini tanlang!'
                                }
                            ]}
                            name="passportPhotoId"
                        >
                            <input
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>


                        <p>7) {t('ariza')}:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>

                        <Form.Item className='d-flex justify-content-center mt-3'>
                            <Button className='signUp' htmlType="submit">{t('send')}</Button>
                        </Form.Item>
                    </Form>
                )
            }
            case "RECOVER": {
                return (
                    <Form name="dynamic_form_nest_item" onFinish={onFinish}
                          autoComplete="off">
                        <Form.Item>
                            <p>{t('phone')}:
                                <br/>
                                <input onChange={(e) => {
                                    setStudent({
                                        ...Student, phone: e.target.value
                                    })
                                }}
                                       className='form-control' type="number"/>
                            </p>
                        </Form.Item>
                        <p>1) {t('direction')}:</p>
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
                        <p>2) {t('talim-shakli')}:</p>
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
                        <p>3) {t('til')}:</p>
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
                        <p>4) {t('Transklip')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>5) {t('sabab')}:
                            <input className='mx-2' onChange={(e) => {
                                setFileBoolin(e.target.checked)
                            }} type="checkbox"/>file
                        </p>
                        {
                            fileBoolin ?
                                <input className='form-control' type="file" accept="application/pdf"/>
                                :
                                <input className='form-control' type="text"/>
                        }
                        <p>6) {t('pasport')}</p>
                        <input className='form-control' type="file" accept="application/pdf"/>

                        <p>7) {t('ariza')}:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>

                        <Form.Item className='d-flex justify-content-center mt-3'>
                            <Button className='signUp' htmlType="submit">{t('send')}</Button>
                        </Form.Item>
                    </Form>
                )
            }
        }
    };
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

                            <p>{t('talim-shakli')}: <span>{Student.oldEducationForm}</span></p>
                            <p>{t('talim-tili')}: <span>{Student.oldEducationLang}</span></p>

                            <p>{t('talim-turi')}: <span>{Student.oldEducationType}</span></p>
                            <p>{t('course')}: <span>{Student.course}</span></p>

                            <p>{t('group')}: <span>{Student.group}</span></p>
                            <p>{t('address')}:
                                <span>{Student.country} {Student.city} {Student.district}</span>
                            </p>
                        </div>

                        <div className="center">
                            <h5>{t('give-reason-for-ttj')}</h5>
                            <Segmented
                                onChange={(e) => {
                                    setStudent({...Student, applicationType: e})
                                }}
                                block
                                options={[
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


                            <div>
                                {showForm()}
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