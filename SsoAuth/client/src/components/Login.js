import React from "react";
import useForm from "./useForm";

// Login page component
const SignupForm = ({ submitForm }) => {
  const { handleChange, handleFormSubmit, values, errors } =
    useForm(submitForm);
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <h2 className="title"> LOGIN PAGE </h2>
        </div>
        <form className="form-wrapper">
          <div className="username">
            <label className="label"> Username </label>
            <input
              className="input"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username} </p>}
          </div>
          <div className="password">
            <label className="label"> Password </label>
            <input
              className="input"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password} </p>}
          </div>
          <div className="name">
            <button className="submit" onClick={handleFormSubmit}>
              {" "}
              Login{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
