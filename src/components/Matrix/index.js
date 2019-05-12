import React, { Component } from 'react';

import MatrixItem from './MatrixItem';
import classes from './Matrix.module.css';

class Matrix extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.show;
    }

    render() {
        const { x, y, ones, changeItem } = this.props;
        let matrixDef = [];
        for (let i = 0; i < x; i++) {
            let matrixRow = [];
            for (let j = 0; j < y; j++) {
                matrixRow.push(<MatrixItem key={(i + 1) + '_' + (j + 1)}
                    one={ones.find(el => { return (el.x === (i + 1) && el.y === (j + 1)) })}
                    clicked={() => changeItem(i, j)} />);
            }
            matrixDef.push(<div key={i + 1} className={classes.row}>{matrixRow}</div>);
        }

        return (
            <div className={classes.matrix}>{matrixDef}</div>
        );
    }
}

export default Matrix;