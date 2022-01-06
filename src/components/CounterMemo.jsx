import { useState, useMemo, useCallback } from 'react';

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
    <div style={{ backgroundColor: themeOn ? 'black' : 'white', color: themeOn ? 'white' : 'black' }}>
      <h1>Counter</h1>
      <input value={counter} onChange={(e) => setCounter(e.target.value)} type='number' placeholder='enter number' />
      <button onClick={themeHandler}>Toggle theme</button>
      <h2>{numberCalculated}</h2>
    </div>
  );
};

export default CounterMemo;
