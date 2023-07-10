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
export const addSpeciality = async (body, setBeginAddSpeciality) => {
    try {
        setBeginAddSpeciality(true);
        const token = localStorage.getItem('token');
        const response = await axios
            .post(`${ApiName1}/api/specialty`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });
        console.log(response);

        return response;
    } catch (e) {
        console.log(e)
    }
}
export const deleteSpeciality = async (id, setBeginDeleteSpeciality) => {
    try {
        setBeginDeleteSpeciality(true);
        const token = localStorage.getItem('token');
        const response = await axios
            .delete(`${ApiName1}/api/specialty/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}