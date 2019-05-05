
import { Epic, combineEpics, ofType } from "redux-observable"
import { from, of } from 'rxjs'
import { switchMap, filter, withLatestFrom, map, catchError } from 'rxjs/operators'
import { ActionType, isActionOf, action } from 'typesafe-actions'
import { RootState } from './reducer'

import * as actions from "./actions"

type Action = ActionType<typeof actions>


const movementEpic: Epic<Action, Action, RootState> = (action$, store) =>
  action$.pipe(
    ofType('MOVE'),
    withLatestFrom(store),
    map(([action, store]) => {
      
      const { player } = store
      
      const newLocation = 
        action.payload == 'right' ? { ...player.location, x: player.location.x + 1 } :
        action.payload == 'left' ? { ...player.location, x: player.location.x - 1 } :
        action.payload == 'up' ? { ...player.location, y: player.location.y - 1 } :
        action.payload == 'down' ? { ...player.location, y: player.location.y + 1 }
        : player.location

      const newTile = store.map.geo[newLocation.y][newLocation.x]

      if(newTile.background !== "black") {
        return actions.setPlayerLocation(newLocation)
      }
      else {
        return actions.setPlayerLocation(player.location)
      }
      
    })
  )


export const rootEpic = combineEpics(movementEpic)
