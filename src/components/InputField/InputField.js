import React, { useState } from "react";
import './InputField.css';

const InputField = ({
  inputValue,
  inputFunc,
  inputPlaceholder,
  inputName,
  errorMessage,
  inputType,
}) => {

  const [isValid, setIsValid] = useState();

  const placeholderMessage =
    isValid === false ? errorMessage : inputPlaceholder;

  return (
    <input
      type={inputType}
      value={inputValue}
      name={inputName}
      placeholder={placeholderMessage}
      className={`input__field ${isValid === false ? "danger" : ""}`}
      onChange={inputFunc}
    ></input>
  );
};

export default InputField;
