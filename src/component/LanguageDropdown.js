import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { get } from "lodash";
import flaguzbekistan from "../img/uz.svg"
import flagrussia from "../img/russia.svg"
import { useTranslation } from "react-i18next";




const LanguageDropdown = () => {
  const {t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("");
  const languages = {
    uz: {
      label: "O'zbek",
      flag: flaguzbekistan,
    },
    ru: {
      label: "Русский",
      flag: flagrussia,
    },
  };

  useEffect(() => {
    const currentLanguage = localStorage.getItem("i18nextLng");
    setSelectedLang(currentLanguage);
  }, []);

  const changeLanguage = (lang) => {
    localStorage.setItem("i18nextLng", lang);
    setSelectedLang(lang);
    i18n.changeLanguage(lang);

  };

  const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdown(!isLanguageDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isLanguageDropdown}
        toggle={toggleLanguageDropdown}
        className="ms-1 topbar-head-dropdown header-item d-flex justify-content-end align-items-center">
        <DropdownToggle
          className="d-flex justify-content-center align-items-center  btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
          tag="button">
          <img
            src={get(languages, `${selectedLang}.flag`)}
            alt="Header Language"
            height="25"
            className="rounded"/>
        </DropdownToggle>
        <DropdownMenu className="notify-item language py-2">
          {Object.keys(languages).map((key) => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguage(key)}
              className={`notify-item ${
                selectedLang === key ? "active" : "none"
              }`}>
              <img src={get(languages, `${key}.flag`)} alt="Skote" className="me-2 rounded" height="18"/>
              <span className="align-middle">
                {get(languages, `${key}.label`)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default LanguageDropdown;
