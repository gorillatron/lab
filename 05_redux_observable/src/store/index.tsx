import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { ActionType, isActionOf } from 'typesafe-actions'
import { rootReducer, RootState } from './reducer'
import { rootEpic } from './epic'
import * as actions from './actions'

type Action = ActionType<typeof actions>

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>()

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  )

  epicMiddleware.run(rootEpic)

  return store
}