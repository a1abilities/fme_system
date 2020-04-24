import { useState } from 'react';

const useSignUpForm = (state, callback) => {
  const [inputs, setInputs] = useState(state);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };


  const handleEditSubmit = event => {
    if(event){
      event.preventDefault();
    }
    callback();
    console.log("callback = ", callback);
  }

  const handleInputChange = e =>
    setInputs({
    ...inputs,
    [e.target.name]: e.target.value,
  });

  const handleReset = RESET_VALUES => {
    setInputs(inputs => RESET_VALUES);
  };

  const setInput = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    handleEditSubmit,
    inputs,
    handleReset,
    setInput,
  };
};

export default useSignUpForm;
