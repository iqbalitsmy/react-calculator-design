import { useReducer } from 'react';
import './App.css';
import './style.css';
import DigitButton from './DigitButton';
import OparationButton from './OparationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOSE_OPARTION: 'choose-oparation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'dlete-digit',
  EVALUATE: 'evaluate',
}

function reducer (state, { type, payload}) {
  // eslint-disable-next-line default-case
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === "0" && state.currentOparand === "0") return state;
      if(payload.digit === "." && state.currentOparand.includes(".")) return state;
    return {
      ...state,
      currentOparand: `${state.currentOparand || ""}${payload.digit}`
    }
  }
}

function App() {
  const [{ currentOparand, previousOparand, oparation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'>{previousOparand} {oparation}</div>
        <div className='current-operand'>{currentOparand}</div>
      </div>
      <button className='span-two'>AC</button>
      <button>DEL</button>
      <OparationButton operation='÷' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OparationButton operation='*' dispatch={dispatch} />
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
      <button className='span-two'>=</button>
    </div>
  );
}

export default App;
