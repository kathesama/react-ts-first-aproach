import React, { FC } from 'react';
import cssStyle from './landTest.module.scss';

const Home:FC<any> = (): any => (
    <div className={cssStyle.App}>
        Eureka!
    </div>
  );

export default Home;