import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  let inputClasses = [];
  if (props.inputClass) {
    inputClasses = props.inputClass.split(' ').map(el => classes[el]);
  }
  inputClasses.push(classes.InputElement);

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  inputElement = (
    <input
      type={props.type}
      className={inputClasses.join(' ')}
      {...props}
      value={props.value}
      onChange={props.changed}
    />
  );

  return (
    <div className={classes.Input}>
      {inputElement}
    </div>
  );
};

export default Input;
