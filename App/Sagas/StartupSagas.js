import { put, select } from 'redux-saga/effects'
import mqtt from 'react-native-mqtt'

// exported to make available for tests
export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
export function * startup (action, dispatch) {
  startMqtt(dispatch)
}

function startMqtt (dispatch) {

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
      client.publish('/data', "test", 0, false);
    });

    client.connect();
  }).catch(function(err){
    console.log(err);
  });
}
