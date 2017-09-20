/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import MqttActions from '../Redux/MqttRedux'
import mqtt from 'react-native-mqtt'

const prefix = 'user/device/00000000-0000-0000-0000-000000000007'

export function * init () {

  const options = {
    port: 1883,
    auth: false,
    keepalive: 45,
    tls: false,
    selfSignedCertificates: false,
    host: '192.168.1.185', //change to your IP address
    clientId: 'test',
  };

  mqtt.createClient(options).then(function(client) {

    client.on('closed', function() {
      console.log('mqtt.event.closed');

    });

    client.on('error', function(msg) {
      console.log('mqtt.event.error', msg);

    });

    client.on('message', function(msg) {
      console.log('mqtt.event.message', msg);
    });

    client.on('connection-error', (data) => {
      console.log('mqtt.event.connection-error', data);
    })

    client.on('connect', function() {
      console.log('connected');
      client.subscribe('/data', 0);
      client.subscribe(prefix + '/fire/status', 0);
      // client.publish('/data', "test", 0, false);
      // client.publish('/data', "rameez", 0, false);
    });

    client.connect();
  }).catch(function(err){
    console.log('Error creating client', err);
  });
}

export function * publish () {

}
