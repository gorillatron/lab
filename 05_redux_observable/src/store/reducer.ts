
import { combineReducers } from "redux"
import { ActionType, isActionOf } from 'typesafe-actions'
import * as actions from '../store/actions'

type Action = ActionType<typeof actions>

export type RootState = {
  map: MapState
  player: PlayerState
}

export type MapState = {
  geo: Array<Array<MapEntity>>
}

export type PlayerState = {
  location: { x: number, y: number }
}

export type MapEntity = {
  background: string
}

const startmap = [
  [{background: 'black'},{background: 'black'},{background: 'black'},{background: 'black'},{background: 'black'},{background: 'black'}],
  [{background: 'black'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'black'}],
  [{background: 'black'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'black'}],
  [{background: 'black'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'black'}],
  [{background: 'black'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'black'}],
  [{background: 'black'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'white'},{background: 'black'}],
  [{background: 'black'},{background: 'black'},{background: 'black'},{background: 'black'},{background: 'black'},{background: 'black'}],
]

export const mapReducer = (state:MapState = { geo: startmap }, action:Action) => {
  return state
}

export const playerReducer = (state:PlayerState = {location: {x: 2, y: 2}}, action:Action) => {
  if(action.type == 'SET_PLAYER_LOCATION') {
    return {
      ...state,
      location: action.payload
    }
  }
  return state
}

export const rootReducer = combineReducers<RootState>({
  map: mapReducer,
  player: playerReducer
})