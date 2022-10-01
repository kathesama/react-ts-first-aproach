/*
Created by: Katherine Aguirre
On: 27/4/2022 : 27/4/2022
Project: react-ts-first-aproach
*/
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Outlet, Link } from 'react-router-dom';

// import LanguageSelector from '@/components/languageSelector/languageSelector';
import LanguageSelector from '../../components/languageSelector/languageSelector';
import logo from '../../assets/img/logo.svg';

import cssStyle from './headerPage.module.scss';

const HeaderPageComponent: FC<any> = (props: any): any => {
  const { t } = useTranslation();

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-small">
        <div data-testid="header-page" className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" title="header" className="nav-link navbar-brand">
                <div>
                  <img src={logo} alt="logo" className={cssStyle.img}/>
                  {t('headerPage')}
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="signup" title="signup" className="nav-link">{t('signUpBtn')}</Link>
            </li>
            <li className="nav-item">
              <Link to="login" title="login" className="nav-link">{t('logIn')}</Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <LanguageSelector />
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default HeaderPageComponent;
