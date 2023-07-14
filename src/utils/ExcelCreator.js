import React from 'react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {get} from "lodash";

const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = {Sheets: {data: ws}, SheetNames: ["data"]};
    const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
};

// {
//     "id": 8,
//     "name": "AZIZJONOV ABDULAZIZ UMARJON O‘G‘LI",
//     "faculty": "Elektronika va avtomatika fakulteti",
//     "specialty": "Elektronika va asbobsozlik (priborsozlik)",
//     "phone": "998330030528",
//     "course": "1-kurs",
//     "login": "315221103408",
//     "status": "IS_ACCEPTED",
//     "country": "O‘zbekiston",
//     "city": "Toshkent shahri",
//     "district": "Olmazor tumani",
//     "gender": "Erkak",
//     "changeSpecialtyId": 1,
//     "oldEducationForm": "Kunduzgi",
//     "oldEducationLanguage": "O‘zbek",
//     "newEducationForm": "FULL_TIME",
//     "newEducationLanguage": "ENGLISH",
//     "changeSpecialty": {
//     "id": 1,
//         "name": "Issiqlik energetikasi va issiqlik texnikasi"
// },
//     "reasonText": "123123dadsdasd",
//     "imageUrl": "https://hemis.tdtu.uz/static/crop/2/9/320_320_90_2951606343.jpg",
//     "recordBookUrl": "/api/attach/download/edd17823-bc41-4a3f-89d4-704a50de6018",
//     "applicationFileUrl": "/api/attach/download/47748e8d-c865-42cb-9254-3a6545b821c9",
//     "passportPhotoUrl": "/api/attach/download/e2b650ad-2379-46e8-8cf3-acb6c8ad7042"
// }

export const exportToCSVData = (apiData, fileName) => {
    const studentList = apiData.map((item, index) => {
        let student = {};
        student["number"] = index + 1;
        student["id"] = get(item, 'id') || '';
        student["faculty"] = get(item, 'faculty') || '';
        student["name"] = get(item, 'name') || '';
        student["specialty"] = get(item, 'specialty') || '';
        student["group"] = get(item, 'group') || '';
        student["phone"] = get(item, 'phone') || '';
        student["course"] = get(item, 'course') || '';
        student["gender"] = get(item, 'gender') || '';
        student["address"] = get(item, 'country') + ','
            + get(item, 'city') + ','
            + get(item, 'district') || '';
        student["login"] = get(item, 'login') || '';
        student["oldEducationForm"] = get(item, 'oldEducationForm') || '';
        student["oldEducationLanguage"] = get(item, 'oldEducationLanguage') || '';
        student["changeSpecialty"] = get(item, 'changeSpecialty.name') || '';

        switch (item?.newEducationForm) {
            case "FULL_TIME": {
                student["educationForm"] = "Kundizgi";
            }
            case "PART_TIME": {
                student["educationForm"] = "Sirtqi";
            }
            default: {
                student["educationForm"] = "Kechki";
            }
        }
        switch (item?.newEducationLanguage) {
            case "ENGLISH": {
                student["educationLang"] = "Ingliz";
            }
            case "RUSSIAN": {
                student["educationLang"] = "Rus";
            }
            default: {
                student["educationLang"] = "Uzbek";
            }
        }
        switch (item?.type) {
            case "RECOVER": {
                student["type"] = "O'qishni tiklash";
            }
            case "CHANGE_LANG": {
                student["type"] = "Ta'lim tilini o'zgartirish";
            }
            default: {
                student["type"] = "Ta'lim yo'nalishini o'zgartirish";
            }
        }

        return student;
    });

    const worksheet = XLSX.utils.json_to_sheet(studentList);

    const datas = [
        "№", "ID", "Fakultet",
        "F.I.SH", "Yo'nalish", "Guruh",
        "Tefon raqam", "Kurs", "Jinsi",
        "Address", "Login","Ta'lim shakli","Ta'lim tili", "O'zgartirmoqchi bo'lgan yo'nalishi",
        "O'zgartirmoqchi bo'lgan ta'lim shakli",
        "O'zgartirmoqchi bo'lgan ta'lim tili", "Ariza turi",
    ];


    XLSX.utils.sheet_add_aoa(worksheet, [datas], {origin: "A1"});

    const wb = {Sheets: {data: worksheet}, SheetNames: ["data"]};

    // Write the workbook to an Excel buffer
    const excelBuffer = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'array',
        sheetFormat: {
            baseColWidth: 30,
            defaultRowHeight: 30,
        },
    });

    // Create a Blob from the Excel buffer
    const data = new Blob([excelBuffer], {type: fileType});

    // Save the Blob as a file
    FileSaver.saveAs(data, fileName + fileExtension);
};
