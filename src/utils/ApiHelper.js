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
        console.log(response)
        const {data} = response;

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
                    'Content-type':'application/json'
                }
            });
        console.log(response);
        const {data} = response;

        return data;
    } catch (e) {
        console.log(e)
    }
}