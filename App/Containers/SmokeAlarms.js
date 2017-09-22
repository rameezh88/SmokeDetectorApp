import React, { Component } from 'react'
import { View, Text, FlatList, Switch } from 'react-native'
import { connect } from 'react-redux'
import { Fonts, Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import MqttActions from '../Redux/MqttRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SmokeAlarmsStyle'
import { MqttTypes } from '../Redux/MqttRedux'

class SmokeAlarms extends Component {
  static navigationOptions = {
    title: 'Smoke Alarms',
  }

  _keyExtractor = (item, index) => item.deviceId

  _renderItem = ({ item }) => {
    console.log('Should render item', item)
    const { roomName, deviceName, batteryLevel, alarmActive, online, deviceId } = item;
    return (
      <View style={{ flex: 1, padding: 5, flexDirection: 'row', minHeight: 60 }}>
        <View style={{margin: 5, height: 10, width: 10, backgroundColor: online ? 'green' : 'red', borderRadius: 5 }}/>
        <View
          style={{flex: 1, marginLeft: 5}}
        >
          <View style={{
            flexDirection: 'row'
          }}>
            <Text
              style={{
                ...Fonts.style.normal,
                flex: 1,
              }}
            >
              {roomName}
              <View
                style={{
                  borderColor: alarmActive ? 'red' : 'grey',
                  borderWidth: 1,
                  borderRadius: 2,
                  alignSelf: 'center',
                  marginLeft: 10,
                  width: 60,
                  height: 10
                }}
              >
                <Text
                  style={{
                    ...Fonts.style.tiny,
                    color: alarmActive ? 'red' : 'grey',
                  }}
                >{ alarmActive ? 'alarm on' : 'alarm off'}</Text>
              </View>
            </Text>
            <View style={{ flexDirection: 'row'}}>
              <Icon name={`battery-${this._getBatteryLevelForIcon(batteryLevel)}`} size={10} color={this._getBatteryColorForIcon(batteryLevel)} />
              <Text
                style={{
                  ...Fonts.style.tiny,
                  textAlign: 'right',
                  marginLeft: 5,
                  color: 'grey'
                }}
              >{`${batteryLevel}%`}</Text>
            </View>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text
              style={{
                ...Fonts.style.italicMedium,
                flex: 1,
                color: Colors.charcoal
              }}
            >{deviceName}</Text>
            <Switch
              disabled={!alarmActive}
              tintColor={Colors.frost}
              onTintColor={Colors.error}
              value={alarmActive}
              onValueChange={(value) => {
                console.log('Switch value', value);
                if (!value) {
                  this.props.turnOffAlarm(deviceId)
                }
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  _getBatteryLevelForIcon = (batteryLevel) => {
    if (batteryLevel > 25 && batteryLevel <= 75) {
      return 'half'
    } else if (batteryLevel > 10 && batteryLevel <= 25) {
      return 'quarter'
    } else if (batteryLevel > 75 && batteryLevel <= 90) {
      return 'three-quarters'
    } else if (batteryLevel > 90) {
      return 'full'
    } else {
      return 'empty'
    }
  }

  _getBatteryColorForIcon = (batteryLevel) => {
    if (batteryLevel > 25 && batteryLevel <= 75) {
      return 'blue'
    } else if (batteryLevel > 10 && batteryLevel <= 25) {
      return 'yellow'
    } else if (batteryLevel > 75 && batteryLevel <= 90) {
      return 'light-green'
    } else if (batteryLevel > 90) {
      return 'green'
    } else {
      return 'red'
    }
  }

  render () {
    const { payload } = this.props.mqtt;
    return (
      <View style={styles.container}>
        <FlatList
          data={ payload ? payload.sensors : [] }
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mqtt: state.mqtt
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    turnOffAlarm: (deviceId) => dispatch(MqttActions.turnOffAlarm(deviceId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmokeAlarms)
