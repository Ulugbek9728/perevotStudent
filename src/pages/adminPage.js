import React, {useEffect, useState} from 'react';
import {
    UserAddOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Modal, Input} from 'antd';
import {Route, Routes, useNavigate} from "react-router";
import axios from "axios";
import logout from "../img/logout.png"
import "../asset/Admin.scss"
import {ApiName1} from "../APIname1";
import {toast} from "react-toastify";
import Menu1 from "../component/menu1";
import Menu2 from "../component/menu2";
import SpecialityList from "../component/SpecialityList";


const {Header, Content, Footer, Sider} = Layout;

function AdminPage(props) {
    const navigate = useNavigate();
    const [sucsessText, setSucsessText] = useState('');
    const [message, setMessage] = useState('');
    const [selectedValue, setSelectedValue] = useState(window.location.pathname.split('/')[2] === ''? '1' :window.location.pathname.split('/')[2]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [NewPassword, setNewPassword] = useState({});

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        axios.post(`${ApiName1}/dkn/dekan/change_password`, NewPassword, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response.data);
            setIsModalVisible(false);
            setSucsessText("Parolingiz yangilandi")
            setNewPassword(
                {
                    login: '',
                    password: '',
                    oldPassword: '',
                }
            )
        }).catch((error) => {
            console.log(error.response)
            if (error.response.status === 400) {
                setMessage(error.response.data)
            }
        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_Info");
        localStorage.removeItem("id");
        localStorage.removeItem("degree");
        navigate("/")
    }

    useEffect(() => {
        notify();

        setMessage('');
        setSucsessText('')
    }, [sucsessText, message]);

    function notify() {

        if (sucsessText !== '') {
            toast.success(sucsessText)
        }
        if (message !== '') {
            toast.error(message)
        }
    }

    return (
        <Layout>
            <Sider style={{
                overflow: 'auto', height: '100vh',
                position: 'fixed', left: 0, top: 0, bottom: 0,
            }}>
                <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)',}}/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedValue]}
                      onClick={(into) => {
                          if (into.key === "1") {
                              setSelectedValue("1")
                              navigate("/Adminyoli/");
                          }
                          if (into.key === "2") {
                              navigate("/Adminyoli/2");
                              setSelectedValue("2")
                          }
                      }}
                      items={[
                          {
                              label: "Arizachilar ro'yxati",
                              key: "1",
                              icon: <UserAddOutlined/>
                          },
                          {
                              label: "Yo'nalishlar",
                              key: "2",
                              icon: <UserAddOutlined/>
                          },
                      ]}/>
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200,}}>
                <Header>
                    <span className="HeaderTitle">Admin paneli</span>
                </Header>
                <div className="dropdown">
                    <button type="button" className="btn " data-bs-toggle="dropdown"
                            data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                        {localStorage.getItem("user_Info") &&
                            localStorage.getItem("user_Info").slice(0, 2)}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <a className="dropdown-item" href="#">
                                {localStorage.getItem("user_Info")}
                            </a>
                        </li>
                        <li onClick={showModal}>
                            <a className="dropdown-item" href="#">Parolni yangilash</a></li>
                        <li onClick={signOut}><a className="dropdown-item" href="#">Chiqish<img
                            src={logout} alt=""/></a></li>
                    </ul>
                    <Modal className='ticherModal' title="Parolni o'zgartirish" open={isModalVisible}
                           onOk={handleOk} onCancel={handleCancel}>
                        <div className="w-100">
                            <label htmlFor="editLogin">Login kiriting</label>
                            <Input id='editLogin' placeholder="AA1234567" allowClear value={NewPassword.login}
                                   onChange={(e) => {
                                       setNewPassword({...NewPassword, login: e.target.value.toUpperCase()})
                                   }}
                                   maxLength="9"/>
                            <label htmlFor="editPassword">Eski parolingizni kiriting</label>
                            <Input id='editPassword' allowClear value={NewPassword.oldPassword}
                                   onChange={(e) => {
                                       setNewPassword({...NewPassword, oldPassword: e.target.value,})
                                   }}/>
                            <label htmlFor="editPassword">Yangi parol kiriting</label>
                            <Input id='editPassword' allowClear value={NewPassword.password}
                                   onChange={(e) => {
                                       setNewPassword({...NewPassword, password: e.target.value,})
                                   }}/>
                        </div>

                    </Modal>
                </div>

                <Content style={{margin: '24px 16px 0', overflow: 'initial',}}>
                    <Routes>
                        <Route path={"/"} element={<Menu1/>}/>
                        <Route path={"/2"} element={<SpecialityList/>}/>
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    );
}

export default AdminPage;