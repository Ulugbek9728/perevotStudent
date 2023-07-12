import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Select, Spin} from "antd";
import {Label} from "reactstrap";
import {addSpecialityAlternative, getAllSpeciality, getAllSpecialityAlternative} from "../../utils/ApiHelper";
import {toast} from "react-toastify";

const SpecialityAlternativeAddModal = ({show, onClose, onOk, speciality, setIsReload, isReload}) => {
    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [beginGetData, setBeginGetData] = useState(false);
    const [specialityList, setSpecialityList] = useState([]);

    useEffect(() => {
        setBeginGetData(true)
        if (speciality?.id !== undefined) {
            getAllSpecialityAlternative(speciality?.id)
                .then((res) => {
                    setSpecialityList(res?.data?.map((item) => item.id));
                });
            getAllSpeciality(setBeginGetData)
                .then((res) => {
                    const map = res?.data
                        ?.filter((item) => item?.id !== speciality?.id)
                        ?.map((item) => {
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
        }
    }, [speciality?.id]);
    const onSubmit = (body) => {
        addSpecialityAlternative({...body, toSpecialityId: speciality?.id})
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setIsReload(!isReload);
                    onClose();
                    toast.success("Success!")
                } else {
                    toast.error(res?.data);
                }
            })
            .catch(reason => {
                console.log(reason)
            });
    }

    return (
        <>
            <Modal
                title="Turdoshlarga bo'lish."
                centered
                open={show}
                footer={null}
                onCancel={onClose}
            >
                <Spin spinning={beginGetData}>
                    <Form
                        form={form}
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
                                name: 'specialityList',
                                value: specialityList
                            },
                        ]}
                        onFinish={onSubmit}
                    >
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Yo\'nalish tanlash shart!!'
                                }
                            ]}
                            name="specialityList"

                        >
                            <Label>Yo'nalishlar</Label>
                            <Select
                                allowClear
                                onChange={(e) => setSpecialityList(e)}
                                placeholder="Yo'nalishlarni tanlang..."
                                mode="multiple"
                                loading={beginGetData}
                                value={specialityList}
                                options={data?.map((item) => {
                                    return {
                                        label: item?.name,
                                        value: item?.id,
                                    }
                                })}
                            >
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <div className="d-flex justify-content-end">
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => {
                                        form.resetFields();
                                        setSpecialityList([]);
                                        onClose();
                                    }}
                                    size={"default"}
                                    // className="btn btn-danger"
                                >Bekor qilish</Button>
                                <Button
                                    type={"primary"}
                                    size="default"
                                    className="mx-2"
                                    htmlType="submit"
                                    loading={false}
                                >Qo'shish</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>

            </Modal>
        </>
    );
};

export default SpecialityAlternativeAddModal;