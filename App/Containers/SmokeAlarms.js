import React, { Component } from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SmokeAlarmsStyle'

class SmokeAlarms extends Component {
  static navigationOptions = {
    title: 'Smoke Alarms',
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>SmokeAlarms Container</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmokeAlarms)
