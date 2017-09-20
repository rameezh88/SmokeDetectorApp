import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  init: null,
  publish: ['payload'],
})

export const MqttTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: (state) => state,
  [Types.PUBLISH]: (state) => state,
})
