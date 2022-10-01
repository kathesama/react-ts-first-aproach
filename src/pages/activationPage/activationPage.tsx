/*
Created by: Katherine Aguirre
On: 27/4/2022 : 27/4/2022
Project: react-ts-first-aproach
*/
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios/useAxios';
import { tokenUserUrl } from '../../utilities/routes';

// import useAxios from '@/hooks/useAxios/useAxios';
// import { getPostUserUrl, tokenUserUrl } from '@/utilities/routes';
// import cssStyle from './activationPage.module.scss';

const ActivationPage: FC<any> = (props: any): any => {
  const { i18n } = props;
  const { token = '' } = useParams();
  const { error, success, loading : submitting, action } = useAxios();

  useEffect( () => {
    if (token) {
      const content = {
        url: tokenUserUrl(token),
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n?.language || 'en',
        },
        method: 'POST',
        data: {},
      };

      action(content, () => {});
    }
  }, [token]);

  const successMessage = success && (<div className="alert alert-success mt-3">
    <span>Account is activated</span>
  </div>);

  return (
    <div data-testid="activation-page">
      <h1>Activation Page</h1>
      {successMessage}
    </div>
  );
};

export default ActivationPage;
