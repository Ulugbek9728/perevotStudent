import axios from "axios";
import {ApiName1} from "../APIname1";

export const getAllSpeciality = async (setBeginGetData) => {
    try {
        setBeginGetData(true);
        const token = localStorage.getItem('token');
        return await axios
            .get(`${ApiName1}/api/specialty`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    } catch (e) {
        console.log(e)
    }
}
export const addSpeciality = async (body) => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .post(`${ApiName1}/api/specialty`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });
    } catch (e) {
        console.log(e)
    }
}
export const deleteSpeciality = async (id) => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .delete(`${ApiName1}/api/specialty/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    } catch (e) {
        console.log(e)
    }
}
export const editSpeciality = async (id, body) => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .put(`${ApiName1}/api/specialty/${id}`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    } catch (e) {
        console.log(e)
    }
}
export const getAllSpecialityAlternative = async (specialityId) => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .get(`${ApiName1}/api/specialty/alternative/${specialityId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    } catch (e) {
        console.log(e)
    }
}
export const addSpecialityAlternative = async (body) => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .post(`${ApiName1}/api/specialty/alternative`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });
    } catch (e) {
        console.log(e)
    }
}

export const getStudentInfo = async () => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .get(`${ApiName1}/api/student/account/me`, {
                params: {
                    'token': `${token}`
                }
            });
    } catch (e) {
        console.log(e)
    }
}
export const getAlternativePublicList = async (name) => {
    try {
        return await axios
            .get(`${ApiName1}/api/specialty/public/alternative/${name}`, {});
    } catch (e) {
        console.log(e)
    }
}

export const getStudentInfoAll = async (lan) => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .post(`${ApiName1}/api/student/filter/admin`, {type:lan}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .catch((e)=>{console.log(e)});
    } catch (e) {console.log(e)}
}
export const deleteStudent = async (id) => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .delete(`${ApiName1}/api/student/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    } catch (e) {
        console.log(e)
    }
}