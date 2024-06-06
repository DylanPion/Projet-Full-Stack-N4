import React from "react";

const Input = ({ label, id, error, ...props }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="custome-input">
        <input id={id} {...props} placeholder={props.placeholder} />
        <i className={props.icon}></i>
        <div className="input-error-message">{error && <p>{error}</p>}</div>
      </div>
    </>
  );
};

export default Input;
