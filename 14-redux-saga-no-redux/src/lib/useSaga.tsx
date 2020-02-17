import React, { useContext } from 'react'
import { EventEmitter } from 'events'
import { Dispatch, useReducer, useRef, useEffect, createContext } from 'react'
import { runSaga, stdChannel, RunSagaOptions } from 'redux-saga'
import { StrictEffect } from 'redux-saga/effects'

export type SagaStore<S, A> = [S, Dispatch<A>]

export const createSagaContext = <S, A> (
  reducer: (state: S, action: A) => S,
  initialState: S,
  saga: () => Iterator<StrictEffect, any>,
  options?: Omit<RunSagaOptions<A, S>, 'channel' | 'dispatch' | 'getState'>
) => {

  const context = createContext<SagaStore<S, A> | null>(null)

  const Provider: React.FC = ({ children }) => {

    const [state, dispatch] = useSaga(reducer, initialState, saga, options)

    return (
      <context.Provider value={[state, dispatch]} children={children} />
    )
  }

  const useContextSaga = () => {
    const sharedContext = useContext(context)
    if(!sharedContext)
      throw new Error('')
    return sharedContext
  }

  return {
    Provider,
    useContextSaga,
    saga
  }
}

export const useSaga = <S, A> (
  reducer: (state: S, action: A) => S,
  initialState: S,
  saga: () => Iterator<StrictEffect, any>,
  options?: Omit<RunSagaOptions<A, S>, 'channel' | 'dispatch' | 'getState'>
): SagaStore<S, A> => {

  const emitter = useRef(new EventEmitter())
  const [reactState, reactDispatch] = useReducer(reducer, initialState)

  const stateRef = useRef<S>(reactState)
  
  useEffect(() => {
    stateRef.current = reactState
  }, [reactState])

  useEffect(() => {
    const channel = stdChannel<A>()
    const sagaOptions = options || {}
    const task = runSaga({
      channel,
      dispatch(action: A) {
        reactDispatch(action)
      },
      getState() {
        return stateRef.current
      },
      ...sagaOptions
    }, saga)

    const cancel = () => 
      task.cancel()

    emitter.current.on('action', 
      (action: A) => channel.put(action))

    return cancel
  }, [])

  const enhancedDispatch: Dispatch<A> = (action) => {
    reactDispatch(action)
    emitter.current.emit("action", action)
    return action
  }

  return [reactState, enhancedDispatch]
}