import React from 'react';
import styles from './Input.module.css';

function isInvalid(valid, touched, shouldValidate) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text';
    const cls = [ styles.Input ];
    const htmlFor = `${inputType}-${Math.floor( Math.random() * 100 )}`;

    if(isInvalid) {
        cls.push( styles.invalid );
    }


    return (
        <div className={cls.join( ' ' )}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={inputType}
                value={props.value}
                onChange={props.onChange}
            />

            {
                isInvalid( props )
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }


        </div>
    );
};

export default Input;