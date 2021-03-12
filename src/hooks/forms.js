import { useState } from "react";

const useForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value, // this changes the component event.target.name
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};
export default useForm;
