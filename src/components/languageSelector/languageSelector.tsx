/*
Created by: Katherine Aguirre
On: 26/4/2022 : 26/4/2022
Project: react-ts-first-aproach
*/
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cssStyle from "./languageSelector.module.scss";
import esVe from "@/assets/img/es_ve.png";
import enUs from "@/assets/img/en_usa.png";

const LanguageSelectorComponent: FC<any> = (): any => {
  const { i18n } = useTranslation();

  return (
    <div className="mb-3">
      <img
        src={enUs}
        data-testid='enUsImg'
        alt="English"
        className={cssStyle.img}
        id="en"
        title="English"
        onClick={async () => {
          await i18n.changeLanguage('en');
        }}
        aria-hidden="true"
      />
      &nbsp;
      <img
        src={esVe}
        alt="Spanish"
        data-testid='esVeImg'
        className={cssStyle.img}
        id="es"
        title="Spanish"
        onClick={async () => {
          await i18n.changeLanguage('es');
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default LanguageSelectorComponent;
