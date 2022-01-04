import { useState, useEffect } from "react";
import Validation from "./Validation";
import axios from "axios";
import { setCookie, getCookie } from "../utility/Utility";

const apiUrl = "http://localhost:3020";

const useForm = (submitForm) => {

  // State for values
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // State for is data correct
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  // State for session register
  const [sessionRegister, setSessionRegister] = useState(undefined);

  // handles changes for state values
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //This function is invoked when the form is submitted
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setDataIsCorrect(true);

    // Gets redirectURL from query
    const url_query = new URLSearchParams(window.location.search).get(
      "redirectURL"
    );

    // data of login info 
    const data = {
      username: values.username,
      user_password: values.password,
      redirectURL: url_query,
    };

    // Sends login info to sso auth server to login
    axios
      .post(`${apiUrl}/auth`, data)
      .then((response) => {
        console.log("[Auth Response]", response);

        // if the response is true then saves the session in a cookie
        if (response.data.auth === true) {
          setCookie("sessionID", response.data.session);
          console.log("SESSION REGISTERED", response.data);
          setSessionRegister(response.data.session);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Invoked when sesssion is saved in cookie
  useEffect(() => {
    if (sessionRegister && getCookie("sessionID")) {
      console.log("effect session");

      // Gets redirectURL from query
      const url_query = new URLSearchParams(window.location.search).get(
        "redirectURL"
      );
      // Redirects to redirectURL
      window.location.href = url_query;
    }
  }, [sessionRegister]);

  return { handleChange, handleFormSubmit, errors, values };
};

export default useForm;
