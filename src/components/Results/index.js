import React from 'react';

import ResultItem from './ResultItem';
// import classes from './Results.module.css';

const results = ({res}) => {
    const resultTable = res.slice(-10).map((el,index) => {
        return (
            <ResultItem key={index} {...el} />
        );
    });
    return (
        <div>
            <ResultItem key='header' chance='Вероятность' domainCount='Количество доменов в матрице' size='Количество ячеек в матрице (N*M)' />
            {resultTable}
        </div>
    );
}

export default results;