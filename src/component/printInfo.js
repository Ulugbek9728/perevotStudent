import React, {useEffect, useState} from 'react';
import "../asset/printInfo.scss"
import {useTranslation} from "react-i18next";


export const PrintInfo = React.forwardRef((props, ref) => {
    const {t} = useTranslation();

    return (
        <div ref={ref} className='printInfo'>
            <div className="Ariza">{t("result")}</div>
            <div className="top">
                <img className='userIcon'
                     src="https://sites.temple.edu/listen/files/2015/10/qian-headshot-3x4.jpg" alt=""/>
                <div className="box">
                    <div className='FullName'>
                        Islom Abdug'aniyevich Karimovhjjk
                    </div>
                    <div className="id">
                        <b>ID:</b>89465132453
                    </div>
                    <div className="id">
                        <b>Jins:</b> Erkak
                    </div>
                </div>
            </div>
            <div className="line"/>
            <div className="boxInfo">
                <div className="title">{t('faculty')}:</div>
                <div className="text">Neft va gaz fakulteti</div>

                <div className="title">{t('direction')}:</div>
                <div className="text">Texnologik mashinalar va jihozlar (neftgaz sanoati mashina va jihozlari)</div>

                <div className="title">{t('talim-shakli')}:</div>
                <div className="text">Kunduzgi</div>

                <div className="title">{t('talim-tili')}:</div>
                <div className="text">O‘zbek</div>

                <div className="title">{t('talim-turi')}:</div>
                <div className="text">Bakalavr</div>

                <div className="title">{t('course')}:</div>
                <div className="text">1-kurs</div>

                <div className="title">{t('group')}:</div>
                <div className="text">45-21 TMJ(ngsmj)(o')</div>

                <div className="title">{t('address')}:</div>
                <div className="text">O‘zbekiston Buxoro viloyati G‘ijduvon tumani</div>

                <div className="title">{t('phone')}:</div>
                <div className="text">+998900354140</div>
            </div>

        </div>
    );
});