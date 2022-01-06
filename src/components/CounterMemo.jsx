import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';

function slowFunction(num) {
  for (let index = 0; index < 100000000; index++) {
    return num * 2;
  }
  return num * 2;
}

const CounterMemo = () => {
  const [counter, setCounter] = useState(0);
  const [themeOn, setThemeOn] = useState(false);

  const numberCalculated = useMemo(() => {
    console.log('Slow function ran..');
    return slowFunction(counter);
  }, [counter]);

  function themeHandler() {
    setThemeOn((prevState) => !prevState);
  }

  return (
    <CardActionArea style={{ backgroundColor: themeOn ? 'black' : 'white', color: themeOn ? 'white' : 'black' }}>
      <h1>Counter</h1>
      <input value={counter} onChange={(e) => setCounter(e.target.value)} type='number' placeholder='enter number' />
      <Button variant='contained' onClick={themeHandler}>
        Toggle theme
      </Button>
      <h2>{numberCalculated}</h2>
    </CardActionArea>
  );
};

export default CounterMemo;
