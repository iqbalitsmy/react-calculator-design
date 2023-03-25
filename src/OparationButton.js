import { ACTIONS } from './App'

export default function OparationButton ({ dispatch, operation }) {
    return <button onClick={() => dispatch({ type: ACTIONS.CHOSE_OPARTION, payload: {operation}})}>{operation}</button>
}