/*
Created by: Katherine Aguirre
On: 27/4/2022 : 27/4/2022
Project: react-ts-first-aproach
*/
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

// import cssStyle from './userPage.module.scss';

const UserPagePage: FC<any> = (props: any): any => {
  const { id } = useParams();

  return (
    <div data-testid="user-page">
      <h1>User Page</h1>
      <h1>{`User: ${id}`}</h1>
    </div>
  );
};

export default UserPagePage;
