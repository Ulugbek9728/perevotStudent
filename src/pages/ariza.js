import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import axios from "axios";
import {Button, Form, Segmented, Select} from 'antd';
import {ApiName1} from "../APIname1";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import Nav from "../component/nav";
import Footer from "../component/footer";
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
            educationForm: '',
            educationLang: '',
            educationType: '',
            applicationType: 'CHANGE_SPECIALITY',
            attachList: [],
            changeLanguage: '',
            changeSpecialtyID: null,
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
                    educationForm: response.data.data.educationForm.name,
                    educationLang: response.data.data.educationLang.name,
                    educationType: response.data.data.educationType.name,
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

    console.log(Student)

    const showForm = () => {
        // eslint-disable-next-line default-case
        switch (Student?.applicationType) {
            case "CHANGE_LANG": {
                return (
                    <Form name="dynamic_form_nest_item" onFinish={onFinish}
                          autoComplete="off">
                        <p>{t('faculty')}: <span>{Student.faculty}</span></p>
                        <p>{t('direction')}: <span>{Student.specialty}</span></p>

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
                        <p>Transklip / zachyotka</p>
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

                        <p>Sabab:
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

                        <p>Pasport nusxasini yuklang</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>Ariza:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>

                        <Form.Item>
                            <Button htmlType="submit">{t('send')}</Button>
                        </Form.Item>
                    </Form>
                )
            }
            case "CHANGE_SPECIALITY": {
                return (
                    <Form name="dynamic_form_nest_item"
                          onFinish={onFinish}
                          autoComplete="off">
                        <p>{t('direction')}:</p>
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
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Yonalish tanlash kerak!'
                                }
                            ]}
                        >
                            <Select
                                placeholder="O'tmoqchi bo'lgan yo'nalishni tanlang..."
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

                        <p>{t('talim-shakli')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Talim shakli tanlanishi kerak!'
                                }
                            ]}
                            name="changeLanguage"

                        >
                            <Select
                                placeholder="Talim shaklini tanlang..."
                                style={{
                                    width: "100%",
                                }}
                                onChange={(e) => {
                                    setStudent({...Student, educationForm: e})
                                }}
                                allowClear
                                options={specialityForms}
                            />
                        </Form.Item>

                        <p>{t('til')}:</p>
                        <Form.Item>
                            <Select
                                style={{
                                    width: "100%",
                                }}
                                placeholder="Ta'lim tilini tanlang..."
                                onChange={handleChangeLen}
                                allowClear
                                options={specialityLang}
                            />
                        </Form.Item>

                        <p>Transklip / zachyotka</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>Sabab:
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
                        <p>Pasport nusxasini yuklang</p>
                        <input className='form-control' type="file" accept="application/pdf"/>


                        <p>Ariza:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>

                        <Form.Item>
                            <Button htmlType="submit">{t('send')}</Button>
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
                        <p>Transklip / zachyotka</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                        <p>Sabab (file yoki text):
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
                        <p>Pasport nusxasini yuklang</p>
                        <input className='form-control' type="file" accept="application/pdf"/>

                        <p>Ariza:</p>
                        <input className='form-control' type="file" accept="application/pdf"/>
                    </Form>
                )
            }
        }
    }
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
                                <input onChange={(e) => {
                                    setStudent({
                                        ...Student, phone: e.target.value
                                    })
                                }}
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
                            <p>
                                {t('direction')}
                                <span>
                                    O‘zi o‘qigan ta’lim yo’nalishi yoki unga turdosh bo’lgan ta’lim yo’nalishini tanlash;
                                </span>
                            </p>
                            <p>
                                {t('talim-shakli')}
                                <span>
                                    Sirtqi, kunduzgi va kechki ta’lim shakllaridan birini tanlash;
                                </span>
                            </p>
                            <p>
                                {t('til')}
                                <span>
                                    Ta’lim tilini tanlash ya’ni o’zbek yoki rus tilini ta’nlash;
                                </span>
                            </p>
                            <p>
                                Sabab
                                <span>
                                    O’qishini ko’chirish sababi kiritiladi lozim
                                    bo’lsa korxona tomonidan olingan xatni ilova sifati kiritiladi;
                                </span>
                            </p>
                            <p>
                                Pasport nusxasini yuklash
                                <span>
                                   Talabaning shaxsini tasdiqlovchi pasport nusxasini yuklanadi;
                                </span>
                            </p>
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