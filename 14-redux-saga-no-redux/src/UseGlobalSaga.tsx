import React from 'react'
import { reducer, saga, ping, State } from './store'
import { createSagaContext } from './lib'

const initialState: State = {
  events: []
}

const sagaContext = createSagaContext(reducer, initialState, saga)

export default () => {
  return (
    <div>
      <sagaContext.Provider>

        <p>
          These share state
        </p>

        <Inner />
        <Inner />
        <Inner />
        
      </sagaContext.Provider>
    </div>
  )
}

export const Inner = () => {

  const [state, dispatch] = sagaContext.use()

  return (
    <>

      <div style={{marginBottom: 10}}>
        <button onClick={() => dispatch(ping())}>Ping</button>
      </div>

      <div style={{marginBottom: 10}}>
        {state.events.map((event, index) => (
          <i key={index}>
            {event} {' '}
          </i>
        ))}
      </div>

      {
        state.status &&
          <b style={{color: 'orange'}}>{ state.status }</b>
      }

    </>
  )
}