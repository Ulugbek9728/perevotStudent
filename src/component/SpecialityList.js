import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Input, Select, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {addSpeciality, deleteSpeciality, editSpeciality, getAllSpeciality} from "../utils/ApiHelper";
import {toast} from "react-toastify";
import {Modal} from 'antd';
import {useNavigate} from "react-router";
import SpecialityAlternativeModal from "./modals/SpecialityAlternativeModal";
import SpecialityAlternativeAddModal from "./modals/SpecialityAlternativeAddModal";
import {useTranslation} from "react-i18next";

const {confirm} = Modal;

const SpecialityList = () => {
    const {t} = useTranslation();

    const [formValue, setFormValue] = useState({
        id: '',
        name: '',
        educationLanguage: [],
        educationForms: [],
    });
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentItem, setCurrentItem] = useState({});
    const [beginGetData, setBeginGetData] = useState(false);
    const [beginAddSpeciality, setBeginAddSpeciality] = useState(false);
    const [beginEditSpeciality, setBeginEditSpeciality] = useState(false);
    const [beginDeleteSpeciality, setBeginDeleteSpeciality] = useState(false);
    const [showAlternativeModal, setShowAlternativeModal] = useState(false);
    const [showAlternativeAddModal, setShowAlternativeAddModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const showDeleteConfirm = (onOk) => {
        confirm({
            title: 'Ushbu yo\'nalishni o\'chirmoqchimisz?',
            icon: <ExclamationCircleFilled/>,
            // content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                onOk();
            },

        });
    };

    const columns = [
        {
            title: '№',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <p
                onClick={() => {
                    setCurrentItem(record)
                    setShowAlternativeAddModal(true);
                }}
                style={{cursor: 'pointer'}}
            >
                {text}</p>,
        },
        {
            title: 'Tillar',
            key: 'languages',
            dataIndex: 'languages',
            render: (_, {languages}) => (
                <>
                    {languages?.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {t(tag)}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'O\'quv shakli',
            key: 'forms',
            dataIndex: 'forms',
            render: (_, {forms}) => (
                <>
                    {forms?.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {t(tag)}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Turdoshlari',
            key: 'turdoshlari',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            setCurrentItem(record);
                            setShowAlternativeModal(true);
                        }}
                    >
                        Ko'rish
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        className="border-0"
                        size="small"
                        icon={<EditOutlined/>}
                        onClick={() => {
                            setFormValue({
                                id: record?.id,
                                name: record?.name,
                                educationForms: record?.forms,
                                educationLanguage: record?.languages,
                            });
                            setIsEdit(true);
                            window.scrollTo(0, 0);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        type="dashed"
                        onClick={() => showDeleteConfirm(() => deleteSpecialityOnOk(record?.id))}
                        className="border-0"
                        loading={beginDeleteSpeciality}
                        icon={<DeleteOutlined/>}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const languagesOptions = [
        {
            value: 'UZBEK',
            label: 'Uzbek'
        },
        {
            value: 'RUSSIAN',
            label: 'Rus'
        },
        {
            value: 'ENGLISH',
            label: 'English'
        },
    ];

    const formsOptions = [
        {
            value: 'FULL_TIME',
            label: 'Kunduzgi'
        },
        {
            value: 'EVENING',
            label: 'Kechki'
        },
        {
            value: 'PART_TIME',
            label: 'Sirtqi'
        }
    ];

    useEffect(() => {
        getAllSpeciality(setBeginGetData)
            .then((res) => {
                if (res?.status === 401) {
                    navigate('/')
                } else {
                    const map = res?.data?.map((item) => {
                        return {
                            id: item?.id,
                            name: item?.name,
                            languages: JSON.parse(item?.educationLanguages),
                            forms: JSON.parse(item?.educationForms),
                        }
                    });
                    setData(map);
                    setBeginGetData(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [isReload])

    const addSpecialityOnSubmit = (e) => {
        setBeginAddSpeciality(true);
        setBeginAddSpeciality(true);
        addSpeciality(e)
            .then((res) => {
                    console.log(res);
                    if (res?.status === 200) {
                        setIsReload(!isReload);
                        toast.success("Successfully")
                        setBeginAddSpeciality(false);
                    } else {
                        toast.error(res?.message || res?.data);
                        setBeginAddSpeciality(false);
                    }
                }
            );
    }

    const deleteSpecialityOnOk = (id) => {
        setBeginDeleteSpeciality(true);
        deleteSpeciality(id)
            .then((res) => {
                    console.log(res);
                    if (res?.status === 200) {
                        setIsReload(!isReload);
                        setBeginDeleteSpeciality(false);
                        toast.success("Successfully")
                    } else {
                        toast.error(res?.message || res?.data);
                        setBeginDeleteSpeciality(false);
                    }
                }
            );
    }

    const editSpecialityOnOk = (body) => {
        setBeginEditSpeciality(true);
        editSpeciality(formValue?.id, body)
            .then((res) => {
                if (res.status === 401) {
                    navigate('/');
                } else if (res.status === 400) {
                    toast.error(res?.message || res?.data);
                } else if (res.status === 200) {
                    setIsReload(!isReload);
                    setIsEdit(false);
                    toast.success("Successfully");
                    setFormValue({
                        id: '',
                        name: '',
                        educationLanguage: [],
                        educationForms: [],
                    })
                }
                setBeginEditSpeciality(false);
            })
    }

    return (
        <div>
            <Form
                name="wrap"
                labelCol={{
                    flex: '110px',
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                    flex: 1,
                }}
                colon={false}
                style={{
                    maxWidth: 600,
                }}
                fields={[
                    {
                        name: 'name',
                        value: formValue?.name
                    },
                    {
                        name: 'educationLanguage',
                        value: formValue?.educationLanguage
                    },
                    {
                        name: 'educationForms',
                        value: formValue?.educationForms
                    },
                ]}
                onFinish={isEdit ? editSpecialityOnOk : addSpecialityOnSubmit}
            >
                <Form.Item
                    label="Nomi"
                    name="name"
                    placeholder="Turdosh yonalishlarni tanlang.."
                    rules={[
                        {
                            required: true,
                            message: 'Name is required!'
                        },
                    ]}

                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Tillari"
                    name="educationLanguage"
                    rules={[
                        {
                            required: true,
                            message: 'Languages is required!'
                        },
                    ]}
                >
                    <Select
                        defaultValue={formValue?.educationLanguage}
                        allowClear
                        size={"middle"}
                        style={{
                            maxWidth: 600,
                        }}
                        placeholder="Tillarni tanlang.."
                        options={languagesOptions}
                        mode="multiple"
                    />
                </Form.Item>
                <Form.Item
                    label="O'quv shakli"
                    name="educationForms"
                    rules={[
                        {
                            required: true,
                            message: 'Education form is required!'
                        },
                    ]}
                >
                    <Select
                        defaultValue={formValue?.educationForms}
                        allowClear
                        size={"middle"}
                        style={{
                            maxWidth: 600,
                        }}
                        placeholder="O'quv shaklini tanlang.."
                        options={formsOptions}
                        mode="multiple"
                    />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit"
                            loading={isEdit ? beginEditSpeciality : beginAddSpeciality}>
                        {isEdit ? 'O\'zgartirish' : 'Qo\'shish'}
                    </Button>
                </Form.Item>
            </Form>

            <Divider>Yo'nalishlar ro'yxati</Divider>

            <Table
                loading={beginGetData}
                columns={columns}
                dataSource={data}
            />
            <SpecialityAlternativeModal
                speciality={currentItem}
                show={showAlternativeModal}
                onClose={() => setShowAlternativeModal(false)}
                onOk={() => setShowAlternativeModal(false)}/>

            {showAlternativeAddModal && <SpecialityAlternativeAddModal
                speciality={currentItem}
                isReload={isReload}
                setIsReload={setIsReload}
                show={showAlternativeAddModal}
                onClose={() => {
                    setCurrentItem({});
                    setShowAlternativeAddModal(false)
                }}
                onOk={() => setShowAlternativeAddModal(false)}
            />}
        </div>
    );
};

export default SpecialityList;