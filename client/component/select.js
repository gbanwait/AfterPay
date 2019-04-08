import React from 'react';

const Select = (props) => {
    return (
        <div className={props.parentClass}>
            <label htmlFor={props.name} className={props.labelClass}>{props.title}</label>
            <select 
                id={props.id}
                className={`${props.class}  ${props.error ? 'fieldError' : ''}`}
                onChange={props.action}
                name={props.name}
                value={props.value}
            >
            <option value="" disabled>{props.placeHolder}</option>
            {props.options.map((item) => {
                return(
                    <option key={item} value={item}>{item}</option>
                )
            })}
            </select>
            {props.error ? <span className="error"></span> : ''}
        </div>
    )
}

export default Select;