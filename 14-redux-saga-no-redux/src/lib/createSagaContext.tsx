import React, { useContext } from 'react'
import { createContext } from 'react'
import { RunSagaOptions } from 'redux-saga'
import { StrictEffect } from 'redux-saga/effects'
import { SagaStore, useSaga } from './useSaga'

export const createSagaContext = <S, A> (
  reducer: (state: S, action: A) => S,
  initialState: S,
  saga: () => Iterator<StrictEffect, any>,
  options?: Omit<RunSagaOptions<A, S>, 'channel' | 'dispatch' | 'getState'>
) => {

  const context = createContext<SagaStore<S, A> | null>(null)

  const Provider: React.FC = ({ children }) => {

    const [state, dispatch, run] = useSaga(reducer, initialState, saga, options)

    return (
      <context.Provider value={[state, dispatch, run]} children={children} />
    )
  }

  const use = () => {
    const sharedContext = useContext(context)
    if(!sharedContext)
      throw new Error('')
    return sharedContext
  }

  return {
    Provider,
    use
  }
}