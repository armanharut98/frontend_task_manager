import React from "react";
import InputField from "../InputField";
import "./LoginForm.css";

const LoginForm = ({
  setUserEmail,
  setUserPassword,
  userEmail,
  userPassword,
  login,
}) => {
  return (
    <div className="">
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <InputField
            inputType={"email"}
            inputFunc={({ target }) => {
              setUserEmail(target.value);
            }}
            inputName={"Email"}
            inputPlaceholder={"Email"}
            inputValue={userEmail}
            errorMessage={"Please enter the correct email address"}
          ></InputField>
        </div>
        <div>
          <InputField
            inputType={"password"}
            inputFunc={({ target }) => {
              setUserPassword(target.value);
            }}
            inputName={"Password"}
            inputPlaceholder={"Password"}
            inputValue={userPassword}
            errorMessage={"*Field cannot be empty"}
          ></InputField>
        </div>
        <button type="submit" className="tm__button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
