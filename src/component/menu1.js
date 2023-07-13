import React, {useEffect, useState} from 'react';
import {Button, Modal, Select, Table,} from "antd";
import {deleteStudent, getStudentInfoAll} from "../utils/ApiHelper";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {ApiName1} from "../APIname1";
import {DeleteOutlined, ExclamationCircleFilled} from "@ant-design/icons";


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

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render:(text)=> <img style={{width:100}} src={text} alt=""/>
        },
        {
            title: 'FISH',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "O'qiyotgan",
            children:[
                {
                    title:"Fakultet",
                    dataIndex: 'faculty',
                    key:"faculty"
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
                    render:(text)=><div>{t(text)}</div>
                },
                {
                    title: "Til",
                    dataIndex: 'oldEducationLanguage',
                    key: 'oldEducationLanguage',
                    render:(text)=><div>{t(text)}</div>
                },
            ]
        },
        {
            title: "Ko'chirmoqchi bo'lgan",
            children:[
                {
                    title: "Yo'nalishi",
                    dataIndex: 'changeSpecialty',
                    key: 'changeSpecialty',
                    render:(record)=> <div>{record.name}</div>
                },
                {
                    title: "Ta'lim shakli",
                    dataIndex: 'newEducationForm',
                    key: 'newEducationForm',
                    render:(text)=><div>{t(text)}</div>
                },
                {
                    title: "Til",
                    dataIndex: 'newEducationLanguage',
                    key: 'newEducationLanguage',
                    render:(text)=><div>{t(text)}</div>
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
            render:(text)=> <a href={`${ApiName1}${text}`} target="_blank">Ariza</a>
        },
        {
            title: 'Pasport nusxasi',
            dataIndex: 'passportPhotoUrl',
            key: 'passportPhotoUrl',
            render:(text)=> <a href={`${ApiName1}${text}`} target="_blank">Passport</a>
        },
        {
            title: 'Transklip',
            dataIndex: 'recordBookUrl',
            key: 'recordBookUrl',
            render:(text)=> <a href={`${ApiName1}${text}`} target="_blank">Transklip</a>
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
            render:(text)=> <Button
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
        getStudent()
        setMessage2('')
    }, [message2]);

    function notify() {
        if (message2 !== '') {
            toast.success(message2)
        }
    }

    function getStudent(e) {
        setBeginGetData(true)
        getStudentInfoAll(e)
            .then((res) => {

                    setBeginGetData(false)
                if (res?.status===200){
                    console.log(res.data.content);
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
    return (
        <div>
            <Select
                size={"middle"}
                onSelect={(value) => getStudent(value)}
                style={{
                    width: 500,
                }}
                placeholder="Ariza turini tanlang.."
                options={languagesOptions}/>
            <Table
                loading={beginGetData}
                dataSource={Students}
                columns={columns}
                pagination={{ pageSize: 50}}
                scroll={{ x: 500, }}
                bordered />
        </div>
    );
}

export default Menu1;