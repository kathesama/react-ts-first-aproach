/*
Created by: Katherine Aguirre
On: 27/4/2022 : 27/4/2022
Project: react-ts-first-aproach
*/
import React, { FC } from 'react';
import cssStyle from './invalidUrlPage.module.scss';

const InvalidUrlPagePage: FC<any> = (): any => (
  <main data-testid="invalidUrl-page" className={cssStyle.main}>
    <p>Invalid url: params expected</p>
  </main>
);

export default InvalidUrlPagePage;
