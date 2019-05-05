
import { Epic, combineEpics } from "redux-observable"
import { from, of } from 'rxjs'
import { switchMap, filter, map, catchError } from 'rxjs/operators'
import { ActionType, isActionOf } from 'typesafe-actions'
import { RootState } from './reducer'

import * as actions from "./actions";

type Action = ActionType<typeof actions>


const noopEpic: Epic<Action, Action, RootState> = (action$, store) =>
  action$.pipe(
    
  )


export const rootEpic = combineEpics(noopEpic)
