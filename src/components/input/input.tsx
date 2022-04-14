/*
Created by: Katherine Aguirre
On: 12/4/2022 : 12/4/2022
Project: react-ts-first-aproach
*/
import React, { FC } from "react";
import cssStyle from "./input.module.scss";

const InputComponent: FC<any> = (props: any): any => {
  const { id, placeholder, name, onChange, className, error, label, value = "default", type = "text" } = props;
  return (
    <div className="text-center">
      <div className="mb-3">
        <input
          id={id}
          data-testid={id}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          className={className}
        />
        <span>{error?.username}</span>
      </div>
    </div>
  );
};

export default InputComponent;

