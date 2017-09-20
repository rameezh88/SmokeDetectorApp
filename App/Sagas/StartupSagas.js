import { put, select } from 'redux-saga/effects'
import MqttActions from '../Redux/MqttRedux'
// exported to make available for tests
export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
export function * startup (action) {
  yield put(MqttActions.init());
}

