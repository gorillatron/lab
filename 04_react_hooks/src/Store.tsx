import React from 'react';

type TState = {
  counter: number
}

type TAction = 
  { type:string, payload?:Object }


const initialState:TState = {
  counter: 0
}

export const Store = React.createContext<{
  state: TState,
  dispatch: React.Dispatch<TAction>
}>({
  state: initialState,
  dispatch: () => null
})


function reducer(state:TState, action:TAction) {
  switch (action.type) {
    case 'INC':
      return { ...state, counter: state.counter + 1 }
    case 'DEC':
      return { ...state, counter: state.counter - 1 }
    default:
      return state
  }
}

export function StoreProvider(props:any) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}