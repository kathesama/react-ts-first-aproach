/*
Created by: Katherine Aguirre
On: 12/4/2022 : 12/4/2022
Project: react-ts-first-aproach
*/
import React, { FC } from 'react';
// import cssStyle from './input.module.scss';

const InputComponent: FC<any> = (props: any): any => {
  const { id, placeholder, name, onChange, className, error, label, type = 'text' } = props;
  const inputClass = `${className} ${error?.length > 0 ? ' is-invalid' : ''}`;
  
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        data-testid={id}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className={inputClass}
      />
      {error?.length > 0 && <span className="invalid-feedback">{error}</span>}
    </div>
  );
};

export default InputComponent;

