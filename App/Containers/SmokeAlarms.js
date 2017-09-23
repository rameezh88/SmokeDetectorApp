import React, { Component } from 'react'
import { View, Text, FlatList, Switch } from 'react-native'
import { connect } from 'react-redux'
import { Fonts, Colors } from '../Themes'
import MqttActions from '../Redux/MqttRedux'
import AlarmItem from '../Components/AlarmItem'
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
    return (
      <AlarmItem
        alarmItem={item}
      />
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
