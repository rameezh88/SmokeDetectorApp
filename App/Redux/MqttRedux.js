import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  init: null,
  initSuccess: ['client'],
  turnOffAlarm: ['deviceId'],
  publish: ['data'],
  subscribe: null,
  statusUpdateSuccess: ['payload']
})

export const MqttTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  client: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */
const initSuccess = (state, { client }) => {
  return {
    ...state,
    client
  }
}

const statusUpdateSuccess = (state, { payload }) => {
  console.log('Got data', payload);
  return {
    ...state,
    payload
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: (state) => state,
  [Types.INIT_SUCCESS]: initSuccess,
  [Types.TURN_OFF_ALARM]: (state) => state,
  [Types.PUBLISH]: (state) => state,
  [Types.SUBSCRIBE]: (state) => state,
  [Types.STATUS_UPDATE_SUCCESS]: statusUpdateSuccess,
})
