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

  state = {
    alarmActive: false,
  }

  componentWillReceiveProps (nextProps) {
    try {
      const { mqtt } = nextProps;
      if (mqtt.payload && mqtt.payload.sensors) {
        this.setState({
          alarmActive: false,
        });

        for (var i = 0, len = mqtt.payload.sensors.length; i < len; i++) {
          const sensor = mqtt.payload.sensors[i];
          if (sensor.alarmActive) {
            this.setState({
              alarmActive: true
            })
            break;
          }
        }

      }
    } catch (err) {
      console.log('Error setting alarm state', err)
    }
  }

  _keyExtractor = (item, index) => item.deviceId

  _renderItem = ({ item }) => {
    const { roomName, deviceName, batteryLevel, alarmActive, online } = item;

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
            <View
              style={{
                borderColor: alarmActive ? 'red' : 'grey',
                borderWidth: 1,
                alignSelf: 'center',
                paddingHorizontal: 3
              }}
            >
              <Text
                style={{
                  ...Fonts.style.description,
                  color: alarmActive ? 'red' : 'grey',
                }}
              >{ alarmActive ? 'alarm on' : 'alarm off'}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderHeader = () => {
    const { alarmActive } = this.state;
    return (
      <View style={{
        flex: 1,
        padding: 5,
        backgroundColor: Colors.silver,
        flexDirection: 'row'
      }}>
        <Text style={{
          ...Fonts.style.normal,
          flex: 1,
          alignSelf: 'center',
          marginLeft: 5,
        }}>
          { alarmActive ? 'Silence alarms!' : 'Alarms are off' }
        </Text>
        <Switch
          disabled={!alarmActive}
          tintColor={Colors.frost}
          onTintColor={Colors.error}
          value={alarmActive}
          onValueChange={(value) => {
            console.log('Switch value', value);
            if (!value) {
              this.props.turnOffAlarm()
            }
          }}
        />
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
          ListHeaderComponent={this._renderHeader()}
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
    turnOffAlarm: () => dispatch(MqttActions.turnOffAlarm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmokeAlarms)
