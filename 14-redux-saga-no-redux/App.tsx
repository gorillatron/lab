import React from 'react'
import { take, put, delay } from 'redux-saga/effects'
import { reducer, ping, pong } from './store'
import { useSaga } from './saga'

export default () => {

  const [state, dispatch] = useSaga(
    reducer, 
    {
      events: []
    }, 
    function* saga() {
      while(yield take('ping')) {
        yield delay(2000)
        yield put(pong())
      }
    }
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