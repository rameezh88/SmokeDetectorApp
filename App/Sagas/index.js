import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { MqttTypes } from '../Redux/MqttRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { init, publish, turnOffAlarm } from './MqttSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root (dispatch) {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(MqttTypes.INIT, init, dispatch),
    takeLatest(MqttTypes.PUBLISH, publish),
    takeLatest(MqttTypes.TURN_OFF_ALARM, turnOffAlarm)
  ])
}
