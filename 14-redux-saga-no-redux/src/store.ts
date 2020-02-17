
import { take, put, delay } from 'redux-saga/effects'

export type Ping = 'ping'
export type Pong = 'pong'

export type PingActionType = {
  type: Ping
}

export const ping = (): PingActionType => ({
  type: 'ping'
})

export type PongActionType = {
  type: Pong
}

export const pong = (): PongActionType => ({
  type: 'pong'
})

export type ActionType = 
    PingActionType
  | PongActionType

export type ActionEvent =
    Ping
  | Pong

export type State = {
  events: ActionEvent[]
}

export const reducer = (state: State, action: ActionType): State => {
  switch(action.type) {

    case 'ping':
      const isWaitingForPong = state.events[state.events.length - 1] === 'ping'

      if(isWaitingForPong)
        return state

      return {
        events: [...state.events, 'ping']
      }

    case 'pong':
      return {
        events: [...state.events, 'pong']
      }
      
  }
}

export const saga = function* saga() {
  while(yield take('ping')) {
    yield delay(2000)
    yield put(pong())
  }
}