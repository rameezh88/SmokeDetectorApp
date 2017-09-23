import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import MqttActions from '../Redux/MqttRedux'
import AlarmItem from '../Components/AlarmItem'
import AlarmHeaderItem from '../Components/AlarmHeaderItem'
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
    return (<AlarmHeaderItem
      alarmActive={alarmActive}
      onSwitchToggled={(value) => {
        console.log('Switch value', value);
        if (!value) {
          this.props.turnOffAlarm()
        }
      }}
    />)
  }

  _renderSeparator = () => {
    return (
      <View style={{ flex: 1, height: 1, backgroundColor: Colors.steel}}/>
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
          ListHeaderComponent={this._renderHeader}
          ItemSeparatorComponent={this._renderSeparator}
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
