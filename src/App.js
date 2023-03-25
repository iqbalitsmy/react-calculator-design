import { useReducer } from 'react';
import './App.css';
import './style.css';
import DigitButton from './DigitButton';
import OparationButton from './OparationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOSE_OPARTION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'dlete-digit',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {

  switch (type) {
    //Digit print
    case ACTIONS.ADD_DIGIT:
      //overwrite digit
      if(state.overwrite) {
        return {
          ...state,
          currentOparand: payload.digit,
          overwrite: false,
        }
      }
      //if already add 0 as first number
      if (payload.digit === "0" && state.currentOparand === "0") return state; 
      //already include in input
      if (payload.digit === "." && state.currentOparand.includes(".")) return state; 
      return {
        ...state,
        currentOparand: `${state.currentOparand || ""}${payload.digit}`
      }
      //Oparation
    case ACTIONS.CHOSE_OPARTION:
      if (state.currentOparand == null && state.previousOparand == null) {
        return state
      }
      if(state.currentOparand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOparand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOparand: state.currentOparand,
          currentOparand: null
        }
      }
      return {
        ...state,
        previousOparand: evaluate(state),
        operation: payload.operation,
        currentOparand: null,
      }
      //AC button clear the output
    case ACTIONS.CLEAR:
      return {};
    //Delete digit
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOparand: null,
        }
      }
      if(state.currentOparand == null ) return state;
      if(state.currentOparand.length === 1) {
        return{
          ...state,
          currentOparand: null
        }
      }
      return {
        ...state,
        currentOparand: state.currentOparand.slice(0, -1)
      }
    
    //Evaluate operation
    case ACTIONS.EVALUATE:
      if(state.operation == null || state.currentOparand == null || state.operation == null) {
        return state;
      }
    return {
        ...state,
        overwrite: true,
        previousOparand: null,
        operation: null,
        currentOparand: evaluate(state),
      }
    default:
        return state;
  }
}

function evaluate ({ currentOparand, previousOparand, operation }) {
  const prev = parseFloat(previousOparand);
  const current = parseFloat(currentOparand);
  if(isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation){
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      computation = 0;
  }
  return computation.toString();
}


function App() {
  const [{ currentOparand, previousOparand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'>{previousOparand} {operation}</div>
        <div className='current-operand'>{currentOparand}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })} >AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OparationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OparationButton operation="*" dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OparationButton operation='+' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OparationButton operation='-' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
