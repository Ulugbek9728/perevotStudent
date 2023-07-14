import React, {useEffect, useState} from 'react';
import "../asset/printInfo.scss"
import {useTranslation} from "react-i18next";
import {aboutMe} from "../utils/ApiHelper";
import {useNavigate} from "react-router";


export const PrintInfo = React.forwardRef((props, ref) => {
    const {t} = useTranslation();
    const [student, setStudent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        aboutMe()
            .then((res) => {
                if (res?.status === 200) {
                    setStudent(res?.data);
                }
            })
            .catch((err) => {
                navigate('/')
            })
    }, []);

    return (
        <div ref={ref} className='printInfo'>
            <div className="Ariza">{t("result")}</div>
            <div className="top">
                <img className='userIcon'
                     src={student?.imageUrl} alt=""/>
                <div className="box">
                    <div className='FullName'>
                        {student?.name}
                    </div>
                    <div className="id">
                        <b>ID:</b>{student?.id}
                    </div>
                    <div className="id">
                        <b>{t('gender')}:</b> {student?.gender}
                    </div>
                </div>
            </div>
            <div className="line"/>
            <div className="boxInfo">
                <div className="title">{t('faculty')}:</div>
                <div className="text">{student?.faculty}</div>

                <div className="title">{t('direction')}:</div>
                <div className="text">{student?.specialty}</div>

                {student?.changeSpecialty &&
                    <>
                        <div className="title">{t('directionChangariza')}:</div>
                        <div className="text">{student?.changeSpecialty?.name}</div>
                    </>
                }

                <div className="title"> {t('talim-shakli')}:</div>
                <div className="text">{student?.oldEducationForm}</div>
                {student?.newEducationForm &&
                    <>
                        <div className="title">{t('talim-shakliСhangariza')}:</div>
                        <div className="text">{t(student?.newEducationForm)}</div>
                    </>
                }

                <div className="title">{t('talim-tili')}:</div>
                <div className="text">{student?.oldEducationLanguage}</div>

                <div className="title">{t('talim-tiliChangariza')}:</div>
                <div className="text">{t(student?.newEducationLanguage)}</div>

                <div className="title">{t('talim-turi')}:</div>
                <div className="text">{student?.oldEducationLanguage}</div>

                <div className="title">{t('course')}:</div>
                <div className="text">{student?.course}</div>

                <div className="title">{t('group')}:</div>
                <div className="text">{student?.group}</div>

                <div className="title">{t('address')}:</div>
                <div className="text">{student?.country + ',' + student?.city + ',' + student?.district}</div>

                <div className="title">{t('phone')}:</div>
                <div className="text">+{student?.phone}</div>
            </div>

        </div>
    );
});