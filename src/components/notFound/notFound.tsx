/*
Created by: Katherine Aguirre
On: 5/4/2022 : 5/4/2022
Project: react-typescript
*/
import React, {FC} from 'react';
import cssStyle from './notFound.module.scss';

const NotFoundComponent: FC<any> = (): any => (
    <div data-testid="notFound-page">
        <figure>
            <div className={cssStyle.sadMac} />
            <figcaption>
                <span className={cssStyle.srText}>Error 404: Not Found</span>
                <span className={cssStyle.e} />
                <span className={cssStyle.r} />
                <span className={cssStyle.r} />
                <span className={cssStyle.o} />
                <span className={cssStyle.r} />
                {/* eslint-disable-next-line no-underscore-dangle */}
                <span className={cssStyle._4} />
                {/* eslint-disable-next-line no-underscore-dangle */}
                <span className={cssStyle._0} />
                {/* eslint-disable-next-line no-underscore-dangle */}
                <span className={cssStyle._4} />
                <span className={cssStyle.n} />
                <span className={cssStyle.o} />
                <span className={cssStyle.t} />
                <span className={cssStyle.f} />
                <span className={cssStyle.o} />
                <span className={cssStyle.u} />
                <span className={cssStyle.n} />
                <span className={cssStyle.d} />
            </figcaption>
        </figure>
         <div className={cssStyle.hideText}>Not Found</div>
    </div>
);

export default NotFoundComponent;
