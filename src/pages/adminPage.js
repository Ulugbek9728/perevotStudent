import React, {useEffect,useState} from 'react';
import {
    UserAddOutlined,
    PicLeftOutlined,
    TeamOutlined,
    PauseCircleOutlined,
    GoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Modal, Input} from 'antd';
import {Route, Routes, useNavigate} from "react-router";
import Rector from "../components/Rector";
import Dekan from "../components/Dekan";
import "../asset/Admin.scss"
import News from "../components/news";
import Student from "../components/Students";
import Media from "./media";
import Faculty from "../components/faculty";
import Ttj from "../components/TTJ";
import Kvota from "../components/kvota";
import TtjStudents from "../components/TTJStudents";
import logout from "../img/logout.png"
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast} from "react-toastify";
import Contact from "../components/contact";


const { Header, Content, Footer, Sider } = Layout;

function AdminPage(props) {
    const navigate = useNavigate();
    const [sucsessText, setSucsessText] = useState('');
    const [message, setMessage] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [NewPassword, setNewPassword] = useState({});

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        axios.post(`${ApiName1}/dkn/dekan/change_password`,NewPassword ,{
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response.data);
            setIsModalVisible(false);
            setSucsessText("Parolingiz yangilandi")
            setNewPassword(
                {
                    login:'',
                    password:'',
                    oldPassword:'',
                }
            )
        }).catch((error) => {
            console.log(error.response)
            if (error.response.status===400){
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                      onClick={(into)=>{
                          if (into.key === "1"){ navigate("/Adminyoli/");}
                          if (into.key === "2"){ navigate("/Adminyoli/AddDekan");}
                          if (into.key === "3"){ navigate("/Adminyoli/StudentList");}
                          if (into.key === "4"){ navigate("/Adminyoli/AddNews");}
                          if (into.key === "5"){ navigate("/Adminyoli/Media");}
                          if (into.key === "6"){ navigate("/Adminyoli/Faculty");}
                          if (into.key === "7"){ navigate("/Adminyoli/TTJ");}
                          if (into.key === "8"){ navigate("/Adminyoli/Kvota");}
                          if (into.key === "9"){ navigate("/Adminyoli/TTJStudets");}
                          if (into.key === "10"){ navigate("/Adminyoli/Contact");}
                      }}
                      items={[
                          {
                              label:"Rektor",
                              key:"1",
                              icon:<UserAddOutlined/>
                              },
                          {
                              label:"Dekanlar",
                              key:"2",
                              icon:<UserAddOutlined/>
                          },
                          {
                              label:"Fakultet",
                              key:"6",
                              icon:<GoldOutlined />
                          },
                          {
                              label:"TTJ yaratish",
                              key:"7",
                              icon:<GoldOutlined />
                          },
                          {
                              label:"Kvotaga bo'lish",
                              key:"8",
                              icon:<GoldOutlined />
                          },
                          {
                              label:"Arizalar",
                              key:"3",
                              icon:<TeamOutlined />
                          },
                          {
                              label:"TTJ da turuvchi Talabalar",
                              key:"9",
                              icon:<TeamOutlined />
                          },
                          {
                              label:"Yangiliklar",
                              key:"4",
                              icon:<PicLeftOutlined />
                          },
                          {
                              label:"Media",
                              key:"5",
                              icon: <PauseCircleOutlined />
                          },
                          {
                              label:"Contact",
                              key:"10",
                              icon: <PauseCircleOutlined />
                          },
                          ]} />
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200,}}>
                <Header>
                    <span className="HeaderTitle">TTJ Admin paneli</span>
                </Header>
                <div className="dropdown">
                    <button type="button" className="btn " data-bs-toggle="dropdown"
                            data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                        {localStorage.getItem("user_Info")&&
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
                                   onChange={(e)=>{setNewPassword({...NewPassword, login: e.target.value.toUpperCase()})}}
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
                        <Route path={"/AddDekan"} element={<Dekan/>}/>
                        <Route path={"/Faculty"} element={<Faculty/>}/>
                        <Route path={"/TTJ"} element={<Ttj/>}/>
                        <Route path={"/Kvota"} element={<Kvota/>}/>
                        <Route path={"/AddNews"} element={<News/>}/>
                        <Route path={"/StudentList"} element={<Student/>}/>
                        <Route path={"/TTJStudets"} element={<TtjStudents/>}/>
                        <Route path={"/Media"} element={<Media/>}/>
                        <Route path={"/Contact"} element={<Contact/>}/>
                        <Route path={"/"} element={<Rector/>}/>
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    );
}

export default AdminPage;