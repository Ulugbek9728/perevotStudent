import React, {useEffect, useState} from 'react';
import {Modal, Table, Tag} from "antd";
import {use} from "i18next";
import {getAllSpecialityAlternative} from "../../utils/ApiHelper";

const SpecialityAlternativeModal = ({show, onClose, onOk, speciality}) => {
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
    ];

    useEffect(() => {
        setBeginGetData(true)
        getAllSpecialityAlternative(speciality?.id)
            .then((res) => {
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
            });
    }, [speciality?.id]);

    return (
        <>
            <Modal
                title="Speciality Alternatives"
                centered
                open={show}
                onOk={onOk}
                onCancel={onClose}
                width={1000}
            >

                <Table
                    loading={beginGetData}
                    columns={columns}
                    dataSource={data}
                />
            </Modal>
        </>
    );
};

export default SpecialityAlternativeModal;