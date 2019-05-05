    
import { createAction } from "typesafe-actions"

const NOOP = 'NOOP'

export const noop = createAction(NOOP, resolve => (lat: number, lng: number) => resolve({ lat, lng }))
