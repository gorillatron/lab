
export type Ping = 'ping'
export type Pong = 'pong'

export type PingActionType = {
  type: Ping
}

export type PongActionType = {
  type: Pong
}

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
  return state
}

export const ping = (): PingActionType => ({
  type: 'ping'
})

export const pong = (): PongActionType => ({
  type: 'pong'
})