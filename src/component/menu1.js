import React, {useEffect, useState} from 'react';
import {Button, Input, Modal, Select, Table,} from "antd";
import {deleteStudent, getStudentInfoAll, getStudentInfoAllForExcel} from "../utils/ApiHelper";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {ApiName1} from "../APIname1";
import {DeleteOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {exportToCSVData} from "../utils/ExcelCreator";


const {confirm} = Modal;

function Menu1(props) {
    const {t} = useTranslation();

    const languagesOptions = [
        {
            value: "CHANGE_LANG",
            label: "Talim tilini o'zgartirgan talabalar"
        },
        {
            value: 'CHANGE_SPECIALITY',
            label: "Yo'nalishini o'zgartirgan talabalar"
        },
        {
            value: 'RECOVER',
            label: "O'qishni tiklagan talabalar"
        },
    ];
    const [Students, setStudents] = useState([]);
    const [beginGetData, setBeginGetData] = useState(false);
    const [message2, setMessage2] = useState('');
    const [searchValue, setSearchValue] = useState(null);


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Rasm',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text) => <img style={{width: 100}} src={text} alt=""/>
        },
        {
            title: 'F.I.Sh',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "O'qiyotgan",
            children: [
                {
                    title: "Fakultet",
                    dataIndex: 'faculty',
                    key: "faculty"
                },
                {
                    title: "Yo'nalishi",
                    dataIndex: 'specialty',
                    key: 'specialty',
                },
                {
                    title: "Ta'lim shakli",
                    dataIndex: 'oldEducationForm',
                    key: 'oldEducationForm',
                    render: (text) => <div>{t(text)}</div>
                },
                {
                    title: "Til",
                    dataIndex: 'oldEducationLanguage',
                    key: 'oldEducationLanguage',
                    render: (text) => <div>{t(text)}</div>
                },
            ]
        },
        {
            title: "Ko'chirmoqchi bo'lgan",
            children: [
                {
                    title: "Yo'nalishi",
                    dataIndex: 'changeSpecialty',
                    key: 'changeSpecialty',
                    render: (record) => <div>{record.name}</div>
                },
                {
                    title: "Ta'lim shakli",
                    dataIndex: 'newEducationForm',
                    key: 'newEducationForm',
                    render: (text) => <div>{t(text)}</div>
                },
                {
                    title: "Til",
                    dataIndex: 'newEducationLanguage',
                    key: 'newEducationLanguage',
                    render: (text) => <div>{t(text)}</div>
                },
            ]
        },
        {
            title: 'Kurs',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Tel',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ariza',
            dataIndex: 'applicationFileUrl',
            key: 'applicationFileUrl',
            render: (text) => <a href={`${ApiName1}${text}`} target="_blank">Ariza</a>
        },
        {
            title: 'Pasport nusxasi',
            dataIndex: 'passportPhotoUrl',
            key: 'passportPhotoUrl',
            render: (text) => <a href={`${ApiName1}${text}`} target="_blank">Passport</a>
        },
        {
            title: 'Transklip',
            dataIndex: 'recordBookUrl',
            key: 'recordBookUrl',
            render: (text) => <a href={`${ApiName1}${text}`} target="_blank">Transklip</a>
        },
        {
            title: 'Sabab',
            dataIndex: 'reasonText',
            key: 'reasonText',
            render: (text, record) => {
                return (
                    record?.reasonFileUrl ?
                        <a href={`${ApiName1}${record?.reasonFileUrl}`} target="_blank">Sabab</a> :
                        text
                )
            }
        },
        {
            title: 'Davlat',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Shaxar / viloyat',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Tuman',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <Button
                size="small"
                type="dashed"
                onClick={() => showDeleteConfirm(() => deletStudent(text))}
                className="border-0"
                icon={<DeleteOutlined/>}
            >
                Delete
            </Button>
        },

    ];
    const showDeleteConfirm = (onOk) => {
        confirm({
            title: "Ushbu talabani o'chirmoqchimisz?",
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
    useEffect(() => {
        notify();
        setMessage2('')
    }, [message2]);

    useEffect(() => {
        getStudent(null, searchValue)
    }, [searchValue])

    function notify() {
        if (message2 !== '') {
            toast.success(message2)
        }
    }

    function getStudent(e = null, query) {
        setBeginGetData(true)
        getStudentInfoAll(e,query)
            .then((res) => {
                    setBeginGetData(false)
                    if (res?.status === 200) {
                        setStudents(res.data.content)
                    }
                }
            );
    }

    function deletStudent(id) {

        deleteStudent(id)
            .then((res) => {
                    console.log(res);
                    setMessage2("Talaba o'chirildi")
                }
            );
    }

    const exportExcel = () => {
        getStudentInfoAllForExcel()
            .then((res) => {
                if (res?.status === 200) {
                    exportToCSVData(res?.data, 'arizalar')
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error("Malumotlarni yuklashda xatolik!")
            })

    }
    return (
        <div>
            <Input
                allowClear
                size='middle'
                placeHolder="ID, F.I.SH..."
                className="mx-2"
                style={{width: 500}}
                onChange={(e) => {
                    setSearchValue(e.target.value)
                }}
            />
            <Select
                className="my-2"
                size={"middle"}
                onSelect={(value) => getStudent(value,searchValue)}
                style={{
                    width: 500,
                }}
                allowClear
                placeholder="Ariza turini tanlang.."
                options={languagesOptions}/>

            <Button
                size="middle"
                className="mx-2"
                type="primary"
                onClick={exportExcel}
            >Ma'lumotlarni yuklab olish</Button>
            <Table
                loading={beginGetData}
                dataSource={Students}
                columns={columns}
                pagination={{pageSize: 50}}
                scroll={{x: 500,}}
                bordered/>
        </div>
    );
}

export default Menu1;