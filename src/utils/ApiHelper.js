import axios from "axios";
import {ApiName1} from "../APIname1";

export const getAllSpeciality = async (setBeginGetData) => {
    try {
        setBeginGetData(true);
        const token = localStorage.getItem('token');
        const response = await axios
            .get(`${ApiName1}/api/specialty`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        return response;
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
        const response = await axios
            .delete(`${ApiName1}/api/specialty/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        return response;
    } catch (e) {
        console.log(e)
    }
}
export const editSpeciality = async (id,body) => {
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