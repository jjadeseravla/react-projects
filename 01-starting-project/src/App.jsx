import { useState } from 'react';
import Header from './Header';
import UserInput from './UserInput';
import ResultsTable from './ResultsTable';

function App() {

  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration >= 1;


  function handleUserChange(inputIdentifier, newValue) {
    const newValueNum = Number(newValue);
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        [inputIdentifier]: newValueNum //forces newValue to turn from a 
        //string to a number by typing +newValue, as e.target.value is
        // always a string even if we ask it to be number and the
        //helper function needs to add 2 numbers together but it cant 
        // so just concats the string instead of adding numbers
        
      }

    });
  }

  console.log('app has inputs', userInput)

  return (
    <>
    <Header title="Investment Calculator" />
      <UserInput userInput={userInput} onChangeInput={handleUserChange} />
      {!inputIsValid && <p className='center'>Enter a duration above 0</p>}
      {inputIsValid && <ResultsTable input={userInput} />}
    </>
  )
}

export default App;

