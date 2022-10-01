/*
Created by: Katherine Aguirre
On: 26/4/2022 : 26/4/2022
Project: react-ts-first-aproach
*/
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import esVe from '../../assets/img/es_ve.png';
import enUs from '../../assets/img/en_usa.png';

import cssStyle from './languageSelector.module.scss';

const LanguageSelectorComponent: FC<any> = (): any => {
  const { i18n } = useTranslation();

  return (
    <div className="container">
      <ul className="navbar-nav">
        <img
          src={enUs}
          data-testid='enUsImg'
          alt="English"
          className={`nav-link ${cssStyle.img}`}
          id="en"
          title="English"
          onClick={async () => {
            await i18n.changeLanguage('en');
          }}
          aria-hidden="true"
        />
        <img
          src={esVe}
          alt="Spanish"
          data-testid='esVeImg'
          className={`nav-link ${cssStyle.img}`}
          id="es"
          title="Spanish"
          onClick={async () => {
            await i18n.changeLanguage('es');
          }}
          aria-hidden="true"
        />
      </ul>
    </div>
  );
};

export default LanguageSelectorComponent;
