import { useState, useEffect } from 'react';
import useInput from '../hook/useInput';
import { FormControl, FormLabel, FormGroup, Button } from '@mui/material';

const SimpleInput = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim().length >= 3 && /^[a-zA-Z\s]*$/.test(value));

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => {
    const emailValidationRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValidationRegex.test(value);
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    enteredNameIsValid && enteredEmailIsValid ? setFormIsValid(true) : setFormIsValid(false);
  }, [enteredNameIsValid, enteredEmailIsValid]);

  const formSubmissionhandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    resetNameInput();
    resetEmailInput();
  };

  return (
    <FormGroup onSubmit={formSubmissionhandler}>
      <FormControl className={nameInputHasError && 'invalid'}>
        <FormLabel htmlFor='name'>Your Name</FormLabel>
        <input onChange={nameChangeHandler} onBlur={nameInputBlurHandler} type='text' id='name' value={enteredName} />
        {nameInputHasError && (
          <p className='error-text'>Name must be at least 3 chars long and can contain only letters and spaces</p>
        )}
      </FormControl>
      <FormControl className={emailInputHasError && 'invalid'}>
        <FormLabel htmlFor='name'>Your Email</FormLabel>
        <input
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          type='text'
          id='email'
          value={enteredEmail}
        />
        {emailInputHasError && <p className='error-text'>Enter a valid email</p>}
      </FormControl>
      <div>
        <Button variant='contained' style={{ marginTop: '1rem' }} disabled={!formIsValid}>
          Submit
        </Button>
      </div>
    </FormGroup>
  );
};

export default SimpleInput;
