import { useState, useEffect } from 'react';
import { FormControl, FormLabel, FormGroup, Button } from '@mui/material';

const InputDebounce = () => {
  const [enteredName, setEnteredName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
    setNameIsTouched(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!nameIsTouched) return;
      setNameIsValid(enteredName.trim().length >= 3);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredName, nameIsTouched]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!nameIsTouched) setNameIsValid(false);
    setSuccessMsg('Your name has been submited');
  };

  return (
    <FormGroup onSubmit={submitHandler}>
      {successMsg === '' && (
        <FormControl className={nameIsValid ? '' : 'invalid'}>
          <FormLabel htmlFor='name'>Your Name</FormLabel>
          <input value={enteredName} onChange={nameInputChangeHandler} type='text' id='name' />
        </FormControl>
      )}
      {successMsg !== '' && <h2>{successMsg}</h2>}
      <div className='form-actions'>
        <Button variant='contained' style={{ marginTop: '1rem' }} disabled={!nameIsValid}>
          Submit
        </Button>
      </div>
    </FormGroup>
  );
};

export default InputDebounce;
