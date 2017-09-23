import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Switch } from 'react-native'
import styles from './Styles/AlarmHeaderItemStyle'
import { Colors } from '../Themes'

export default class AlarmHeaderItem extends Component {
  // // Prop type warnings
  static propTypes = {
    alarmActive: PropTypes.bool.isRequired,
    onSwitchToggled: PropTypes.func.isRequired
  }

  // Defaults for props
  static defaultProps = {
    alarmActive: false,
    onSwitchToggled: () => {},
  }

  render () {
    const { alarmActive, onSwitchToggled } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.alarmActiveText}>
          { alarmActive ? 'Silence alarms!' : 'Alarms are off' }
        </Text>
        <Switch
          disabled={!alarmActive}
          tintColor={Colors.frost}
          onTintColor={Colors.error}
          value={alarmActive}
          onValueChange={onSwitchToggled}
        />
      </View>
    )
  }
}
