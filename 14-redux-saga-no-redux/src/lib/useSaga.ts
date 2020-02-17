import { EventEmitter } from 'events'
import { Dispatch, useReducer, useRef, useState } from 'react'
import { runSaga, stdChannel, Saga } from 'redux-saga'
import { spawn } from 'redux-saga/effects'

export type SagaStore<S, A> = [S, Dispatch<A>]

export default <S, A> (
  reducer: (state: S, action: A) => S,
  initialState: S,
  rootSaga: Saga
): SagaStore<S, A> => {

  const initialized = useRef(false)
  const emitter = useRef(new EventEmitter())
  const [state, dispatch] = useReducer(reducer, initialState)

  if(!initialized.current) {

    const channel = stdChannel<A>()
    emitter.current.on('action', (action: A) => channel.put(action))

    const io = {
      channel,
      dispatch(action: A) {
        dispatch(action)
      },
      getState() {
        return state
      }
    }

    runSaga(
      io,
      function * () {
        yield spawn(rootSaga)
      }
    )

    initialized.current = true
  }

  const enhancedDispatch: Dispatch<A> = (action) => {
    dispatch(action)
    emitter.current.emit("action", action)
    return action
  }

  return [state, enhancedDispatch]
}