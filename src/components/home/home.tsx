import React, { FC } from 'react';
import cssStyle from './landTest.module.scss';
import logo from "../../logo.svg";

const Home:FC<any> = ({ props }): any => (
    <div className={cssStyle.App}>
        Eureka!
    </div>
  );

export default Home;