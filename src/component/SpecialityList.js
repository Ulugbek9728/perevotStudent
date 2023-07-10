import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Input, Select, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {addSpeciality, deleteSpeciality, getAllSpeciality} from "../utils/ApiHelper";
import {toast} from "react-toastify";
import {Modal} from 'antd';
import {useNavigate} from "react-router";

const {confirm} = Modal;

const SpecialityList = () => {

    const [formValue, setFormValue] = useState({
        name: '',
        educationLanguage: [],
        educationForms: [],
    });
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [beginGetData, setBeginGetData] = useState(false);
    const [beginAddSpeciality, setBeginAddSpeciality] = useState(false);
    const [beginDeleteSpeciality, setBeginDeleteSpeciality] = useState(false);
    const [isReload, setIsReload] = useState(false);

    const showDeleteConfirm = (onOk) => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleFilled/>,
            content: 'Some descriptions',
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
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
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Oquv shakli',
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
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            console.log(record)
                        }}
                    >
                        Show Alternative
                    </Button>
                    <Button
                        className="border-0"
                        size="small"
                        icon={<EditOutlined/>}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        type="dashed"
                        onClick={() => showDeleteConfirm(()=>deleteSpecialityOnOk(record?.id))}
                        className="border-0"
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
                if (res.status === 401) {
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
            });
    }, [isReload])

    const addSpecialityOnSubmit = (e) => {
        addSpeciality(e, setBeginAddSpeciality)
            .then((res) => {
                    console.log(res);
                    if (res?.status === 200) {
                        setIsReload(!isReload);
                        setBeginAddSpeciality(false);
                        toast.success("Successfully")
                    } else {
                        toast.error(res?.message || res?.data);
                    }
                }
            );
        setBeginAddSpeciality(false);
    }

    const deleteSpecialityOnOk = (id) => {
        deleteSpeciality(id, setBeginDeleteSpeciality)
            .then((res) => {
                    console.log(res);
                    if (res?.status === 200) {
                        setIsReload(!isReload);
                        setBeginDeleteSpeciality(false);
                        toast.success("Successfully")
                    } else {
                        toast.error(res?.message || res?.data);
                    }
                }
            );
        setBeginDeleteSpeciality(false);
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
                onFinish={addSpecialityOnSubmit}
            >
                <Form.Item
                    label="Name"
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
                    label="Oquv shakli"
                    name="educationForms"
                    rules={[
                        {
                            required: true,
                            message: 'Education form is required!'
                        },
                    ]}
                >
                    <Select
                        allowClear
                        size={"middle"}
                        style={{
                            maxWidth: 600,
                        }}
                        placeholder="Oquv shaklini tanlang.."
                        options={formsOptions}
                        mode="multiple"
                    />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" loading={beginAddSpeciality}>
                        Qo'shish
                    </Button>
                </Form.Item>
            </Form>

            <Divider>Speciality List</Divider>

            <Table
                loading={beginGetData}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default SpecialityList;