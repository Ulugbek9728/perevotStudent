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

export const uploadFile = async (files) => {
    const formData = new FormData();
    for (let file of files) {
        formData.append(file?.key, file?.value);
    }
    try {
        return await axios
            .post(`${ApiName1}/api/attach/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
    } catch (err) {

    }
}
export const studentCreate = async (body) => {

    return await axios
        .post(`${ApiName1}/api/student/public/join`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

}

export const getStudentInfoAll = async (lan, query) => {
    try {
        const token = localStorage.getItem('token');
        return await axios
            .post(`${ApiName1}/api/student/filter/admin`,
                {
                    type: lan,
                    name: query
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        page: 0,
                        size: 1500
                    }
                })
            .catch((e) => {
                console.log(e)
            });
    } catch (e) {
        console.log(e)
    }
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
export const aboutMe = async () => {
    const token = localStorage.getItem('token');
    return await axios
        .post(`${ApiName1}/api/student/me`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}


export const getStudentInfoAllForExcel = async () => {
    const token = localStorage.getItem('token');
    return await axios
        .post(`${ApiName1}/api/student/all/admin`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .catch((e) => {
            console.log(e)
        });
}