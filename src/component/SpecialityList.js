import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Input, Select, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {getAllSpeciality} from "../utils/ApiHelper";

const SpecialityList = () => {

    const [formValue, setFormValue] = useState({
        name: '',
        educationLanguages: [],
        educationForms: [],
    });
    const [data, setData] = useState([]);
    const [beginGetData, setBeginGetData] = useState(false);

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
            .then(({data, status}) => {
                console.log(status);
                const map = data?.map((item) => {
                    return {
                        id: item?.id,
                        name: item?.name,
                        languages: JSON.parse(item?.educationLanguages),
                        forms: JSON.parse(item?.educationForms),
                    }
                });
                setData(map);
                setBeginGetData(false);
            });
    }, [])

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
                        name: 'educationLanguages',
                        value: formValue?.educationLanguages
                    },
                    {
                        name: 'educationForms',
                        value: formValue?.educationForms
                    },
                ]}
                onFinish={(data) => {
                    console.log(data);
                }}
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
                    name="educationLanguages"
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
                        // defaultValue="a1"
                        // onChange={(e) => setFormValue({...formValue, educationLanguages: e})}
                        // value={formValue?.educationLanguages}
                        style={{
                            maxWidth: 600,
                        }}
                        placeholder="Tillarni tanlang.."
                        options={languagesOptions}
                        mode="multiple"
                    />
                </Form.Item>
                <Form.Item
                    label="Turdosh"
                    name="educationForms"
                    rules={[
                        {
                            required: true,
                            message: 'Alternative is required!'
                        },
                    ]}
                >
                    <Select
                        allowClear
                        size={"middle"}
                        // defaultValue="a1"
                        // onChange={(e) => setFormValue({...formValue, educationForms: e})}
                        // value={formValue?.educationForms}
                        style={{
                            maxWidth: 600,
                        }}
                        placeholder="Oquv shaklini tanlang.."
                        options={formsOptions}
                        mode="multiple"
                    />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
                        Qo'shish
                    </Button>
                </Form.Item>
            </Form>

            <Divider>Speciality List</Divider>
            <Table
                loading={beginGetData}

                columns={columns}
                dataSource={data}/>
        </div>
    );
};

export default SpecialityList;