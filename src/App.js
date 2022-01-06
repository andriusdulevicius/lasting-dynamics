import SimpleInput from './components/SimpleInput';
import InputDebounce from './components/inputDebounce';
import CounterMemo from './components/CounterMemo';
import { Card } from '@mui/material';

function App() {
  return (
    <Card className='app'>
      <InputDebounce />
      {/* <SimpleInput /> */}
      {/* <CounterMemo /> */}
    </Card>
  );
}

export default App;
