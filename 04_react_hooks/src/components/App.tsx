import * as React from 'react'
import { Store } from '../Store'

export default () => {

  const { state, dispatch } = React.useContext(Store)

  return (
    <div>
      {state.counter}
      <button onClick={() => dispatch({type: 'INC'})}>+</button>
      <button onClick={() => dispatch({type: 'DEC'})}>-</button>
    </div>
  )
}