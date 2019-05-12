import React from 'react';

import classes from './MatrixItem.module.css';

const matrixItem = ({ one, clicked }) => {
    return (
        <div
            className={classes.item}
            style={{ backgroundColor: one ? one.color : '' }}
            onClick={clicked}>
            {one ? 1 : 0}
        </div>
    );
}

export default matrixItem;