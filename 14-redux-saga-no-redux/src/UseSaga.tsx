import React, { useEffect } from 'react'
import { reducer, saga, ping, State, ActionEvent } from './store'
import { useSaga } from './lib'
import { take, select } from 'redux-saga/effects'

const initialState: State = {
  events: []
}

const pingLogger = function* () {
  while(yield take('ping')) {

    const events = (yield select((s) => s.events)) as ActionEvent[]
    const nrOfPings = events.filter(e => e === 'ping').length    

    console.log('pinged', nrOfPings, 'times')
    
    if(nrOfPings === 3) 
      break
  }
}

export default () => {

  const [state, dispatch, run] = useSaga(
    reducer, 
    initialState, 
    saga
  )

  useEffect(() => {
    run(pingLogger)
      .then(_ => console.log('logging done'))
  }, [])

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