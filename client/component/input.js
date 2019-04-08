import React from 'react';

const Input = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name} className={props.labelClass}>{props.title}</label>
            <input
                id={props.id}
                type={props.type}
                name={props.name}
                value={props.value}
                className={`${props.class} ${props.error ? 'fieldError' : ''}`}
                onChange={props.action}
                placeholder={props.placeHolder}
                maxLength={props.max}
                onBlur={(props.onBlur) ? props.onBlur : null}
                
            >
            </input>
            {props.error ? <span className="error">{props.errorMessage}</span> : ''}
        </div>
    )
}

export default Input;