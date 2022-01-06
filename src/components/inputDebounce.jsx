import { useState, useEffect } from 'react';

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
    <form onSubmit={submitHandler}>
      {successMsg === '' && (
        <div className={'form-control ' + (nameIsValid ? '' : 'invalid')}>
          <label htmlFor='name'>Your Name</label>
          <input value={enteredName} onChange={nameInputChangeHandler} type='text' id='name' />
        </div>
      )}
      {successMsg !== '' && <h2>{successMsg}</h2>}
      <div className='form-actions'>
        <button disabled={!nameIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default InputDebounce;
