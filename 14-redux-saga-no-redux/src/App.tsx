import React from 'react'
import { reducer, saga, ping, State } from './store'
import useSaga from './lib/useSaga'

const initialState: State = {
  events: []
}

export default () => {

  const [state, dispatch] = useSaga(
    reducer, 
    initialState, 
    saga
  )

  return (
    <>
      <div>
        <button onClick={() => dispatch(ping())}>Ping</button>
      </div>
      <div>
        {state.events.map((event, index) => (
          <i key={index}>
            {event} {' '}
          </i>
        ))}
      </div>
    </>
  )
}