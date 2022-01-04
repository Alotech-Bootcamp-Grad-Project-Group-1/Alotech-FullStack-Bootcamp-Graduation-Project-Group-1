
// Validation for username and password
const Validation = (values) => {
  let errors = {};

  if(!values.username){
    errors.username="Username is required."
  }else if(!/\S+@\S+\.\S+/.test(values.username)){
    errors.username="Username is invalid."
  }
  if(!values.password){
    errors.password="Password is required."
  } else if (values.password.length < 5) {
    errors.password="Password must be more than five characters."
  }
  return errors;
};

export default Validation;