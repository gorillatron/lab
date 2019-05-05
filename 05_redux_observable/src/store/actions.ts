    
import { createAction } from "typesafe-actions"

const MOVE = 'MOVE'
const SET_PLAYER_LOCATION = 'SET_PLAYER_LOCATION'

export const move = createAction(MOVE, resolve => (direction: string) => resolve(direction))

export const setPlayerLocation = createAction(SET_PLAYER_LOCATION, resolve => (location: {x:number, y:number}) => resolve(location))
