import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import {Button, Form, Input, Segmented, Select} from 'antd';
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import Nav from "../component/nav";
import Footer from "../component/footer";
import ariza from "./Ариза переводга намуна.pdf"
import {getAlternativePublicList, getStudentInfo, studentCreate, uploadFile} from "../utils/ApiHelper";


function Ariza(props) {
    const navigate = useNavigate();
    const [formChangeSpeciality] = Form.useForm();
    const lang = localStorage.getItem('i18nextLng');
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
            newEducationForm: null,
            oldEducationLang: '',
            newEducationLang: null,
            oldEducationType: '',
            applicationType: 'CHANGE_SPECIALITY',
            PNFL: '',
            changeSpecialtyID: null,
            reasonFileId: null,
            reasonText: '',
            passportPhotoId: null,
            applicationFileId: null,
        });
    const [files, setFiles] = useState([]);
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
                    PNFL: response.data.data.passport_pin,
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
        })

    }

    const postStudentCallAPI = (body) => {
        studentCreate(body)
            .then((res) => {
                console.log(res)
                if (res?.status === 201 || res?.status === 200) {
                    toast.success("Successful!");
                    localStorage.setItem('token', res?.data?.jwt)
                    formChangeSpeciality.resetFields();
                    setFiles([]);
                    setStudent({
                        ...Student,
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
                        changeLanguage: '',
                        PNFL: '',
                        changeSpecialtyID: null,
                        reasonFileId: null,
                        reasonText: '',
                        passportPhotoId: null,
                        applicationFileId: null,
                    });
                    navigate('/Result')
                } else {
                    toast.error(res?.message);
                }
                setIsLoading(false)
            })
            .catch((err) => {
                if (err?.response?.status === 400) {
                    toast.error(err?.response?.data)
                } else if (err?.response?.status === 401) {
                    navigate('/')
                }
                setIsLoading(false);
            });
    }

    const postStudent = (values: any) => {
        setIsLoading(true);
        console.log(values)
        switch (Student?.applicationType) {
            case "CHANGE_SPECIALITY": {
                setStudent({
                    ...Student,
                    phone: '+' + values?.phone,
                    changeSpecialtyID: values?.changeSpecialtyID,
                    newEducationForm: values?.newEducationForm,
                    newEducationLang: values?.newEducationLang,
                });
                uploadFile(files)
                    .then((res) => {
                        if (res?.status === 200) {
                            const data = res?.data;
                            let updatedStudent
                                = {...Student};


                            data?.forEach((item) => {
                                updatedStudent = {
                                    ...updatedStudent,
                                    [item?.attachType]: item?.id
                                }
                            });

                            setStudent(updatedStudent);

                            postStudentCallAPI(updatedStudent)
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsLoading(false)
                    });
                return;
            }
            // eslint-disable-next-line no-fallthrough
            default : {
                setStudent({
                    ...Student,
                    phone: '+' + values?.phone,
                    newEducationLang: values?.newEducationLang,
                });

                uploadFile(files)
                    .then((res) => {
                        if (res?.status === 200) {
                            const data = res?.data;
                            let updatedStudent = {...Student};


                            data?.forEach((item) => {
                                updatedStudent = {
                                    ...updatedStudent,
                                    [item?.attachType]: item?.id
                                }
                            });

                            setStudent(updatedStudent);

                            postStudentCallAPI(updatedStudent);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsLoading(false);
                    })

                return;
            }
        }
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
    }, [Student?.changeSpecialtyID, specialityList, lang])

    const handleFile = (key, value) => {
        const index = files.findIndex(file => file.key === key);

        if (index !== -1) {
            // If a file with the same key exists, update its value
            files[index] = {key: key, value: value};
        } else {
            // If a file with the same key doesn't exist, add a new file
            files.push({key: key, value: value});
        }

        setFiles([...files]);
    }

    const showForm = () => {
        // eslint-disable-next-line default-case
        switch (Student?.applicationType) {
            case "CHANGE_LANG": {
                return (
                    <Form
                        name="dynamic_form_nest_item"
                        onFinish={postStudent}
                        autoComplete="off"
                    >
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.phone'),
                                    whitespace: true,
                                    max: 12,
                                    min: 12
                                }
                            ]}
                            name="phone"
                        >
                            <p>{t('phone')}:
                                <Input
                                    placeholder={t('place-holder.phone')}
                                    onChange={(e) => {
                                        setStudent({
                                            ...Student, phone: e.target.value
                                        })
                                    }}
                                    className='form-control'
                                    type="number"
                                    size="large"
                                />
                            </p>
                        </Form.Item>

                        <p>1) {t('Transklip')}</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.file')
                                }
                            ]}
                            name="recordBookId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('recordBookId', e.target.files[0])
                                }}
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>

                        <p>2) {t('til')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('place-holder.lang')
                                }
                            ]}
                            name="newEducationLang"
                        >
                            <Select
                                style={{
                                    width: "100%",
                                }}
                                allowClear
                                options={[
                                    {
                                        value: 'UZBEK',
                                        label: t('UZBEK'),
                                    },
                                    {
                                        value: 'ENGLISH',
                                        label: t('ENGLISH'),
                                    },
                                    {
                                        value: 'RUSSIAN',
                                        label: t('RUSSIAN'),
                                    },
                                ]}
                                onChange={(e) => {
                                    setStudent({...Student, newEducationLang: e})
                                }}
                            />
                        </Form.Item>
                        <p>3) {t('sabab')}:
                            <input
                                className='mx-2'
                                onChange={(e) => {
                                    setFileBoolin(e.target.checked)
                                }}
                                type="checkbox"/>
                            file
                        </p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: `${fileBoolin ? t('required.file') : t('required.reasonText')}`
                                }
                            ]}
                            name={fileBoolin ? "reasonFileId" : "reasonText"}
                        >
                            {
                                fileBoolin ?
                                    <input
                                        onChange={(e) => {
                                            handleFile('reasonFileId', e.target.files[0])
                                        }}
                                        name="reasonFileId"
                                        className='form-control'
                                        type="file"
                                        accept="application/pdf"/>
                                    :
                                    <input
                                        onChange={(e) => {
                                            setStudent({...Student, reasonText: e.target.value})
                                        }}
                                        name="reasonText"
                                        className='form-control' type="text"/>
                            }
                        </Form.Item>

                        <p>4) {t('pasport')}</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.file')
                                }
                            ]}
                            name="passportPhotoId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('passportPhotoId', e.target.files[0])
                                }}
                                className='form-control'
                                type="file"
                                accept="application/pdf"/>
                        </Form.Item>

                        <p>5) {t('ariza')}:</p>
                        <Form.Item
                            rules={
                                [
                                    {
                                        required: true,
                                        message: t('required.file')
                                    }
                                ]
                            }
                            name="applicationFileId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('applicationFileId', e.target.files[0])
                                }}
                                className='form-control' type="file" accept="application/pdf"/>
                        </Form.Item>

                        <Form.Item className='d-flex justify-content-center mt-3'>
                            <Button
                                className='signUp'
                                htmlType="submit"
                            >{t('send')}</Button>
                        </Form.Item>
                    </Form>
                )
            }
            case "CHANGE_SPECIALITY": {
                return (
                    <Form
                        form={formChangeSpeciality}
                        name="dynamic_form_nest_item"
                        onFinish={postStudent}
                        autoComplete="off"
                        fields={[
                            {
                                name: 'phone',
                                value: Student?.phone
                            },
                            {
                                name: 'changeSpecialtyID',
                                value: Student?.changeSpecialtyID
                            },
                            {
                                name: 'newEducationForm',
                                value: Student?.newEducationForm
                            },
                            {
                                name: 'newEducationLang',
                                value: Student?.newEducationLang
                            },
                            {
                                name: 'recordBookId'
                            },
                        ]}
                    >

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.phone'),
                                    whitespace: true,
                                    max: 12,
                                    min: 12
                                }
                            ]}
                            name="phone"
                        >
                            <p>{t('phone')}:
                                <Input
                                    placeholder={t('place-holder.phone')}
                                    onChange={(e) => {
                                        setStudent({
                                            ...Student, phone: e.target.value
                                        })
                                    }}
                                    className='form-control'
                                    type="number"
                                    size="large"
                                />
                            </p>
                        </Form.Item>

                        <p>1) {t('direction')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('place-holder.speciality')
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
                                    message: t('place-holder.form')
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
                                    message: t('place-holder.lang')
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
                                    message: t('required.file')
                                }
                            ]}
                            name="recordBookId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('recordBookId', e.target.files[0])
                                }}
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>
                        <p>5) {t('sabab')}:
                            <input

                                className='mx-2'
                                defaultValue={false}
                                onChange={(e) => {
                                    setFileBoolin(e.target.checked)
                                }}
                                type="checkbox"
                            />
                            File
                        </p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: ` ${fileBoolin ? t('required.file') : t('required.reasonText')}`
                                }
                            ]}
                            name={fileBoolin ? "reasonFileId" : "reasonText"}
                        >
                            {
                                fileBoolin ?
                                    <input name="reasonFileId"
                                           className='form-control'
                                           type="file"
                                           accept="application/pdf"
                                           onChange={(e) => {
                                               handleFile('reasonFileId', e.target.files[0])
                                           }}
                                    />
                                    :
                                    <input
                                        name="reasonText"
                                        className='form-control'
                                        type="text"
                                        onChange={(e) => {
                                            setStudent({...Student, reasonText: e.target.value})
                                        }}
                                    />
                            }
                        </Form.Item>
                        <p>6) {t('pasport')}</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.file')
                                }
                            ]}
                            name="passportPhotoId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('passportPhotoId', e.target.files[0])
                                }}
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>


                        <p>7) {t('ariza')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.file')
                                }
                            ]}
                            name="applicationFileId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('applicationFileId', e.target.files[0])
                                }}
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>
                        <Form.Item className='d-flex justify-content-center mt-3'>
                            <Button
                                className='signUp'
                                loading={isLoading}
                                htmlType="submit"
                            >{t('send')}</Button>
                        </Form.Item>
                    </Form>
                )
            }
            case "RECOVER": {
                return (
                    <Form
                        form={formChangeSpeciality}
                        name="dynamic_form_nest_item"
                        onFinish={postStudent}
                        autoComplete="off"
                        fields={[
                            {
                                name: 'phone',
                                value: Student?.phone
                            },
                            {
                                name: 'changeSpecialtyID',
                                value: Student?.changeSpecialtyID
                            },
                            {
                                name: 'newEducationForm',
                                value: Student?.newEducationForm
                            },
                            {
                                name: 'newEducationLang',
                                value: Student?.newEducationLang
                            },
                            {
                                name: 'recordBookId'
                            },
                        ]}
                    >

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.phone'),
                                    whitespace: true,
                                    max: 12,
                                    min: 12
                                }
                            ]}
                            name="phone"
                        >
                            <p>{t('phone')}:
                                <Input
                                    placeholder={t('place-holder.phone')}
                                    onChange={(e) => {
                                        setStudent({
                                            ...Student, phone: e.target.value
                                        })
                                    }}
                                    className='form-control'
                                    type="number"
                                    size="large"
                                />
                            </p>
                        </Form.Item>

                        <p>1) {t('direction')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('place-holder.speciality')
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
                                    message: t('place-holder.form')
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
                                    message: t('place-holder.lang')
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
                                    message: t('required.file')
                                }
                            ]}
                            name="recordBookId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('recordBookId', e.target.files[0])
                                }}
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>
                        <p>5) {t('sabab')}:
                            <input

                                className='mx-2'
                                defaultValue={false}
                                onChange={(e) => {
                                    setFileBoolin(e.target.checked)
                                }}
                                type="checkbox"
                            />
                            File
                        </p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: `${fileBoolin ? t('required.file') : t('required.reasonText')}`
                                }
                            ]}
                            name={fileBoolin ? "reasonFileId" : "reasonText"}
                        >
                            {
                                fileBoolin ?
                                    <input name="reasonFileId"
                                           className='form-control'
                                           type="file"
                                           accept="application/pdf"
                                           onChange={(e) => {
                                               handleFile('reasonFileId', e.target.files[0])
                                           }}
                                    />
                                    :
                                    <input
                                        name="reasonText"
                                        className='form-control'
                                        type="text"
                                        onChange={(e) => {
                                            setStudent({...Student, reasonText: e.target.value})
                                        }}
                                    />
                            }
                        </Form.Item>
                        <p>6) {t('pasport')}</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.file')
                                }
                            ]}
                            name="passportPhotoId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('passportPhotoId', e.target.files[0])
                                }}
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>


                        <p>7) {t('ariza')}:</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: t('required.file')
                                }
                            ]}
                            name="applicationFileId"
                        >
                            <input
                                onChange={(e) => {
                                    handleFile('applicationFileId', e.target.files[0])
                                }}
                                className='form-control'
                                type="file"
                                accept="application/pdf"
                            />
                        </Form.Item>
                        <Form.Item className='d-flex justify-content-center mt-3'>
                            <Button
                                className='signUp'
                                loading={isLoading}
                                htmlType="submit"
                            >{t('send')}</Button>
                        </Form.Item>
                    </Form>
                )
            }
        }
    };

    const showInfo = () => {
        // eslint-disable-next-line default-case
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

                            <h5 className="mt-4">{t('documentation-for-student')}</h5>
                            {showInfo()}
                        </div>

                        <div className="right-side overflow-auto">
                            {showForm()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Ariza;