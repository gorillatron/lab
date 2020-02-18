import React, { MutableRefObject } from 'react'
import { EventEmitter } from 'events'
import { unstable_ImmediatePriority, unstable_scheduleCallback } from 'scheduler'
import { Dispatch, useReducer, useRef, useEffect } from 'react'
import { runSaga, stdChannel, RunSagaOptions, Saga } from 'redux-saga'

export type RunSaga = (saga: () => Generator) => Promise<void>

export type SagaStore<S, A> = [S, Dispatch<A>, RunSaga]

export type SagaOptions<S, A> = Omit<RunSagaOptions<A, S>, 'channel' | 'dispatch' | 'getState'>

const createSagaIO = <S, A> (dispatch: Dispatch<A>, stateRef: MutableRefObject<S>, options?: SagaOptions<S, A>,) => {
  const channel = stdChannel<A>()
  const sagaOptions = options || {}

  const io = {
    channel,
    dispatch(action: A) {
      dispatch(action)
    },
    getState() {
      return stateRef.current
    },
    ...sagaOptions
  }

  return io
}

export type SagaIO = ReturnType<typeof createSagaIO>

export const useSaga = <S, A> (
  reducer: (state: S, action: A) => S,
  initialState: S,
  saga: Saga,
  options?: Omit<RunSagaOptions<A, S>, 'channel' | 'dispatch' | 'getState'>
): SagaStore<S, A> => {
  
  const emitter = useRef(new EventEmitter())
  const [reactState, reactDispatch] = useReducer(reducer, initialState)

  const stateRef = useRef<S>(reactState)
  const ioRef = useRef<SagaIO>()

  const getIO = () => {
    if(!ioRef.current)
      ioRef.current = createSagaIO(reactDispatch, stateRef, options)
    return ioRef.current
  }
  
  stateRef.current = reactState

  useEffect(() => {
    
    const task = runSaga(getIO(), saga)

    const cancel = () => 
      task.cancel()

    emitter.current.on('action', 
      (action: A) => {
        unstable_scheduleCallback(unstable_ImmediatePriority, () => {
          getIO().channel.put(action)
        })
      })

    return cancel
  }, [])

  const enhancedDispatch: Dispatch<A> = (action) => {
    reactDispatch(action)
    unstable_scheduleCallback(unstable_ImmediatePriority, () => {
      emitter.current.emit("action", action)
    })
    return action
  }

  const run: RunSaga = async (saga): Promise<void> => {
    const task = runSaga(getIO(), saga)
    await task.toPromise()
  }

  return [reactState, enhancedDispatch, run]
}