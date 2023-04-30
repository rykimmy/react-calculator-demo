import { useState } from 'react'
import DigitButton from './components/digitButton'
import OperatorButton from './components/operatorButton'
import './App.css'

function App() {
  const [result, setResult] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);
  const [operator, setOperator] = useState('');
  const [newCalc, setNewCalc] = useState(true);
  const [prevResult, setPrevResult] = useState(null);
  const [reverse, setReverse] = useState(false);

  const operators=['+', '-', '/', '*', '%'];
  const digits=[1,2,3,4,5,6,7,8,9,0];

  const onDigitPress = (digit) => {
    if(newCalc){
      // Only set previous result once (because result becomes null after)
      if (result !== null) {
        setPrevResult(result);
      }
      setResult((prev) => prev * 10 + digit);
    }
    else {
      // If reverse switch applied to second digit
      if (reverse === true) {
        setNextNumber((prev) => prev * 10 + (digit * -1));

      // If reverse switch already applied to first digit (hanlded in OnReversePress)
      } else {
        setNextNumber((prev) => prev * 10 + digit);
      }
    }
  }

  const onOperatorPress = (operator) => {
    setNewCalc(false);
    setOperator(operator);
  }

  const onReversePress = () => {
    setNewCalc(false);

    // If operator not selected, apply +/- to first digit (i.e. result)
    if (operator === '') {
      setResult(result * -1);
      setReverse(false);
    
    // else, set reverse=true, which lets OnDigitPress handle changing nextNumber
    } else {
      setReverse(true);
    }
    
  }

  const onEqualsPress = () => {
    setReverse(false); // reverse always reset to false on equals press
    setResult((prev) => {
      switch(operator){
        case '+': 
          setPrevResult(prev + nextNumber);
          return prev + nextNumber;
        case '-': 
          setPrevResult(prev - nextNumber);
          return prev - nextNumber;
        case '/': 
          setPrevResult(prev / nextNumber);
          return prev / nextNumber;
        case '*': 
          setPrevResult(prev * nextNumber);
          return prev * nextNumber;
        case '%':
          setPrevResult(prev % nextNumber);
          return prev % nextNumber;
        default: 
          return prev;
      }
    });
    setOperator('');
    setNextNumber(null);
  }

  const handleClearPress = () => {
    if (result !== null) {
      setPrevResult(result);
    }

    setReverse(false); // reverse always set to false on clear press
    setResult(null);
    setNewCalc(true);
    setNextNumber(null);
    setOperator('');
  }

  return (
    <>
      <h2>{prevResult != null ? prevResult : "n/a"}</h2>
      <h2>{nextNumber != null ? nextNumber : result ?? 0}</h2>
      <div className="buttons-container">
        <div className="digits-container">
          {
            digits.map((digit) => {
              return(
                <DigitButton key={digit} digit={digit} onClick={onDigitPress} />
              )
            })
          }
        </div>
        <div className="operators-container">
          {
            operators.map((operator) => {
              return(
                <OperatorButton key={operator} operator={operator} onClick={onOperatorPress}/>
              )
            })
          }
          <button className="flips-button" onClick={onReversePress}>+/-</button>
          <button className="equals-button" onClick={onEqualsPress}>=</button>
          <button className="clear-button" onClick={handleClearPress}>Clear</button>
        </div>
      </div>
    </>
  )
}

export default App
