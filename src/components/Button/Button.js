import React from "react";
import "./Button.css";

const Button = ({ needsRegistration, handleButtonChange }) => {
  const buttonName = needsRegistration ? "Login" : "Sign Up";

  return (
    <button className={`tm__button dark`} onClick={handleButtonChange}>
      {buttonName}
    </button>
  );
};

export default Button;
