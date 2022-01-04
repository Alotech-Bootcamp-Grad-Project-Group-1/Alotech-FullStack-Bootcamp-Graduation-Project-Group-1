import React, { useState } from "react";
import Login from "./Login";
import LoginFormSuccess from "./LoginFormSuccess";

const Form = () => {
  //State for is form submitted or not
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const submitForm = () => {
    setFormIsSubmitted(true);
  };
  return (
    <div>
      {/* if formIsSubmitted is false, then Login component is rendered.*/}
      {/* if formIsSubmitted is true, then LoginFormSuccess component is rendered.*/}
      {!formIsSubmitted ? (
        <Login submitForm={submitForm} />
      ) : (
        <LoginFormSuccess />
      )}
    </div>
  );
};

export default Form;
