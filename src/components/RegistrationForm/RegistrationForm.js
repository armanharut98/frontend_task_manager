import React from "react";
import InputField from "../InputField";

const RegistrationForm = ({
  register,
  setUsername,
  username,
  setUserPassword,
  userPassword,
  userEmail,
  setUserEmail,
}) => {
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={register}>
        <div>
          <InputField
            inputType={"text"}
            inputFunc={({ target }) => {
              setUsername(target.value);
            }}
            inputName={"Username"}
            inputPlaceholder={"Name"}
            inputValue={username}
            errorMessage={"*Please enter the correct email address"}
          ></InputField>
        </div>
        <div>
          <InputField
            inputType={"email"}
            inputFunc={({ target }) => {
              setUserEmail(target.value);
            }}
            inputName={"Email"}
            inputPlaceholder={"Email"}
            inputValue={userEmail}
            errorMessage={"*Please enter the correct email address"}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
