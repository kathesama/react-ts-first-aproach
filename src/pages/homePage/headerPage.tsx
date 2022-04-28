/*
Created by: Katherine Aguirre
On: 27/4/2022 : 27/4/2022
Project: react-ts-first-aproach
*/
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Outlet } from 'react-router-dom';
import LanguageSelector from '@/components/languageSelector/languageSelector';

// import cssStyle from './headerPage.module.scss';

const HeaderPageComponent: FC<any> = (props: any): any => {
  // const { history } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [path, setPath] = useState<string>('/');

  const onClickLink = (event: any): void => {
    event.preventDefault();
    // history.pushState({}, '', event.target.attributes.href.value);
    navigate(event.target.attributes.href.value);
    // setPath(event.target.attributes.href.value);
  };

  return (
    <>
      <div className="container">
        <div data-testid="header-page" className="row">
          <h1 className="col-sm">{t('headerPage')}</h1>
          <a href="/" title="header" onClick={onClickLink}>{t('linkGoHome')}</a>
          <a href="signup" title="signup" onClick={onClickLink}>{t('signUp')}</a>
          <a href="login" title="login" onClick={onClickLink}>{t('logIn')}</a>
        </div>
        <LanguageSelector />
      </div>
      <Outlet />
    </>
  );
};

export default HeaderPageComponent;
