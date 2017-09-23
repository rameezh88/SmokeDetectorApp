import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/AlarmItemStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AlarmItem extends Component {
  // Prop type warnings
  static propTypes = {
    alarmItem: PropTypes.object,
  }

  // Defaults for props
  static defaultProps = {
    alarmItem: null
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
    const { roomName, deviceName, batteryLevel, alarmActive, online } = this.props.alarmItem;
    return (
      <View style={styles.container}>
        <View style={[styles.onlineIndicator, {backgroundColor: online ? 'green' : 'red'}]}/>
        <View
          style={styles.topContainer}
        >
          <View style={styles.topRow}>
            <Text
              style={styles.roomNameText}
            >
              {roomName}
            </Text>
            <View style={styles.batteryContainer}>
              <Icon name={`battery-${this._getBatteryLevelForIcon(batteryLevel)}`} size={10} color={this._getBatteryColorForIcon(batteryLevel)} />
              <Text style={styles.batteryLevelText}>{`${batteryLevel}%`}</Text>
            </View>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.deviceNameText}>{deviceName}</Text>
            <View style={[styles.alarmState, {borderColor: alarmActive ? 'red' : 'grey'}]}>
              <Text
                style={[styles.alarmStateText, {color: alarmActive ? 'red' : 'grey'}]}
              >{ alarmActive ? 'alarm on' : 'alarm off'}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
