import { ACTIONS } from './App'

export default function OparationButton ({ dispatch, operation }) {
    return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { operation } }) }>{operation}</button>
}