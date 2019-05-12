import React from 'react';

import classes from './ResultItem.module.css';

const resultItem = ({ chance, domainCount, size }) => {
    return (<div className={classes.row}>
        <div className={classes.item}>{chance}</div>
        <div className={classes.item}>{domainCount}</div>
        <div className={classes.item}>{size}</div>
    </div>);
}

export default resultItem;